import { useState } from "react";
import { Button, TextField } from "@mui/material";

export function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch(
        "https://mern-todo-app-vmcd.onrender.com/todo",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            deadline: new Date(deadline).toISOString(),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setTodos((prevTodos) => [...prevTodos, json.todo]); 
        alert("Todo added");
        setTitle("");
        setDescription("");
        setDeadline("");
      } else {
        console.error("Failed to create todo");
        alert("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("An error occurred while creating the todo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="title"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="desc"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div style={{ marginBottom: 10 }} />{" "}
      
      <TextField
        id="deadline"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="datetime-local"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        style={{
          padding: 25,
          margin: 10,
        }}
        type="submit" 
        variant="contained"
      >
        Create Todo
      </Button>
    </form>
  );
}
