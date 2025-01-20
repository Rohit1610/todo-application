const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to the database");
  } catch (e) {
    console.log(e);
  }
};
const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("todos", TodoSchema);
module.exports = { connectDB,todo };
