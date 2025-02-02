const mongoose = require("mongoose");
const { string } = require("zod");

mongoose.connect(
  "mongodb+srv://abhinav:abhinav2712@cluster0.ontfew9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const mongoURI =
  "mongodb+srv://abhinav:abhinav2712@cluster0.ontfew9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// remember to go to atlas and check if A. MO cluster is created B. User has access, password is right, IP is allowed
// refer: https://www.youtube.com/watch?v=UrjZ3qn44uE

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  deadline: {
    type: Date,
    required: false, // Optional field
  },
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema); //the name of this db now used in index will be todo

module.exports = {
  todo,
};
