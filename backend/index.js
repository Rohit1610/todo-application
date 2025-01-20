require("dotenv").config()
const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { connectDB, todo } = require("./db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
connectDB();
const PORT = 3000;
app.post("/todos", async (req, res) => {
  const createpayload = req.body;
  const parsedpayload = createTodo.safeParse(createpayload);
  if (!parsedpayload.success) {
    return res.status(400).json({ msg: "Wrong inputs entered" });
  }
  await todo.create({
    title: parsedpayload.data.title,
    description: parsedpayload.data.description,
    completed: false,
  });
  res.json({
    msg: "Todo created successfully",
  });
});
app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json(todos);
});
app.put("/completed", async (req, res) => {
  const updatepayload = req.body;
  const parsedpayload = updateTodo.safeParse(updatepayload);
  if (!parsedpayload.success) {
    return res.status(400).json({ msg: "Wrong inputs entered" });
  }
  await todo.update({ _id: parsedpayload.data.id }, { completed: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
