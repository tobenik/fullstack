const express = require("express");
const { getAsync } = require("../redis/index.js");

const router = express.Router();

/* GET statistics listing. */
router.get("/", async (_, res) => {
  const todosAdded = await getAsync("added_todos");
  res.send({ todosAdded: Number(todosAdded) });
});

module.exports = router;
