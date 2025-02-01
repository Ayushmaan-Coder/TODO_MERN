import React, { useState, useEffect } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://mern-todo-app-vmcd.onrender.com/todos"
        );
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching TODOs:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        paddingTop: "20px",
        textAlign: "center",
      }}
    >
      <h1>Welcome to the TODO App! 🚀</h1>
      <p>Add your tasks below: 📝</p>
      <CreateTodo setTodos={setTodos} /> 
      <Todos todos={todos} setTodos={setTodos} />{" "}
    </div>
  );
}

export default App;
