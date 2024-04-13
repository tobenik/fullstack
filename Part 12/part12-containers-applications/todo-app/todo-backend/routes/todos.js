const express = require("express");
const { Todo } = require("../mongo");
// const { getAsync, setAsync } = require("../redis/index.js");

const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  // const todosAdded = await getAsync("added_todos");
  // await setAsync("added_todos", Number(todosAdded));
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  // Increment cache
  // const todosAdded = await getAsync("added_todos");
  // await setAsync("added_todos", (Number(todosAdded) + 1).toString());
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo;
  res.send(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const updates = req.body;
  Object.keys(updates).forEach((key) => {
    req.todo[key] = updates[key];
  });
  try {
    await req.todo.save();
    res.send(req.todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
