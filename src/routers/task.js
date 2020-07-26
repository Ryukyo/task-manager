const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

// GET /tasks?completed=true&limit=5&skip=0&sortBy=createdAt_asc
router.get("/tasks", auth, async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const query = {};
  const sort = {};

  query.owner = req.user._id;
  console.log(req.query);

  if (req.query.completed) {
    query.completed = req.query.completed;
  }

  if (req.query.sortBy) {
    const [sortField, sortDirection] = req.query.sortBy.split("_");
    sort[sortField] = sortDirection;
  }

  try {
    const tasksCount = await Task.find(query).countDocuments();
    const tasks = await Task.find(query).sort(sort).skip(skip).limit(limit);
    res.send({
      results: tasks,
      skip,
      limit: req.query.limit || 0,
      totalPages: Math.ceil(tasksCount / req.query.limit) || 1,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) return res.status(400).send({ error: "Invalid updates!" });

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
