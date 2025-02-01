import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

export function Todos({ todos, setTodos }) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleMarkAsCompleted = (id) => {
    fetch(`https://mern-todo-app-vmcd.onrender.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then(async (res) => {
        if (res.ok) {
          const updatedTodo = await res.json();
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
          );
          alert("Todo marked as completed");
        } else {
          console.error("Failed to mark todo as completed");
        }
      })
      .catch((error) => {
        console.error("Error marking todo as completed:", error);
      });
  };

  const handleUpdateTodo = (id) => {
    fetch(`https://mern-todo-app-vmcd.onrender.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        deadline: new Date(deadline).toISOString(),
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const updatedTodo = await res.json();
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
          );
          setEditingTodoId(null);
          setNewTitle("");
          setNewDescription("");
          setNewDeadline("");
          alert("Todo updated");
        } else {
          console.error("Failed to update todo");
        }
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleDeleteTodo = (id) => {
    fetch(`https://mern-todo-app-vmcd.onrender.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
          alert("Todo deleted");
        } else {
          console.error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div>
      {todos.map((todo) => (
        <Card key={todo._id} style={{ marginBottom: "16px" }}>
          <CardContent>
            {editingTodoId === todo._id ? (
              <Box>
                <TextField
                  label="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                  placeholder="Enter new title"
                />
                <TextField
                  label="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                  placeholder="Enter new description"
                />
                <TextField
                  label="Deadline"
                  type="datetime-local"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateTodo(todo._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingTodoId(null)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Box>
            ) : (
              <>
                <Typography variant="h5" component="h2">
                  {todo.title}
                </Typography>
                <Typography color="textSecondary">
                  {todo.description}
                </Typography>
                {todo.deadline && (
                  <Typography color="textSecondary">
                    Deadline: 🕒 {new Date(todo.deadline).toLocaleString()}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleMarkAsCompleted(todo._id)}
                      color="primary"
                    />
                  }
                  label={
                    todo.completed ? "✅ Completed" : "❓ Mark as Completed"
                  }
                />
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingTodoId(todo._id);
                      setNewTitle(todo.title);
                      setNewDescription(todo.description);
                      setNewDeadline(
                        todo.deadline
                          ? new Date(todo.deadline).toISOString().slice(0, 16)
                          : ""
                      );
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
