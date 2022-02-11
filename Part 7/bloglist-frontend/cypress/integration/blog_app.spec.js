describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //Create user:
    cy.request('POST', 'http://localhost:3003/api/users', {
      blogs: [], username: 'Ada', name: 'Ada Lovelace', password: 'l0v3l4c3'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm')
      .contains('username')
      .parent().contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Ada')
      cy.get('#password').type('l0v3l4c3')
      cy.get('#loginButton').click()

      cy.contains('Ada Lovelace logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Ada')
      cy.get('#password').type('wr0ng')
      cy.get('#loginButton').click()

      cy.get('.notification')
        .contains('Error: Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Ada', password: 'l0v3l4c3'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('blog can be created', function () {
      cy.get('#toggleView').click()
      cy.get('#title').type('Creating a blog')
      cy.get('#author').type('Ada Lovelace')
      cy.get('#url').type('doesntmatter.com')
      cy.get('#submitBlog').click()

      cy.contains('Creating a blog')
    })

    it('user can like a blog', function () {
      cy.get('#toggleView').click()
      cy.get('#title').type('Another blog!')
      cy.get('#author').type('Michael Scarn')
      cy.get('#url').type('dundermiflin.ch')
      cy.get('#submitBlog').click()

      cy.contains('Another blog!')
        .get('#viewBlog').click()
        .parent().contains('likes: 0')
        .get('#likeBlog').click()
        .parent().contains('likes: 1')
    })

    it('user can delete own blog', function () {
      cy.get('#toggleView').click()
      cy.get('#title').type('Dumb blog')
      cy.get('#author').type('Dwight Snute')
      cy.get('#url').type('dundermiflin.ch')
      cy.get('#submitBlog').click()

      cy.get('.blogDiv')
        .contains('Dumb blog')
        .get('#viewBlog').click()
        .parent().get('#removeBlog').click()

      cy.should('not.contain', '.blogDiv')
    })
  })
})