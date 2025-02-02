// here we add all the zod inputs we expect from a user
// run npm install zod for this

const zod = require("zod");

// for the post method lets call the input schema create todo
const createTodo = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

//no input validation in a get method

//for the put method
const updateTodo = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo,
};

// exporting these validation schemas
