const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const JWT_SECRET = config.SECRET

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', { name: 1 })
      const bookList = books.map((book) => {
        return {
          title: book.title,
          published: book.published,
          author: book.author.name,
          genres: book.genres
        }
      })

      //Filtering:
      if (!args.author && !args.genre) {
        return bookList
      } else if (!args.author) {
        return bookList.filter(book => book.genres.includes(args.genre))
      } else if (!args.genre) {
        return bookList.filter(book => book.author === args.author)
      } else {
        return bookList.filter(book => (book.genres.includes(args.genre) && book.author === args.author))
      }
    },
    allAuthors: async (root, args, context) => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      console.log('me', context)
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log('addBook', context)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name }, { born: args.setBornTo }, { new: true }
        )
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salami') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find().populate('author', { name: 1 })
      const booksWritten = books.filter(b => b.author.name === root.name)
      return booksWritten.length
    }
  }
}

module.exports = resolvers