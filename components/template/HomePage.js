import React, { useEffect, useState } from "react";
import Task from "../module/Task";

const HomePage = () => {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    console.log(data);
    if (data.status === "success") setTodos(data.data.todos);
  };

  return ( 
    <div className="home-page">
      <div className="home-page--todo column">
        <p>Todo</p>
        <Task data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
      </div>
      <div className="home-page--inProgress column">
        <p>In Progress</p>
        <Task data={todos.inProgress} fetchTodos={fetchTodos} next="review" back="todo" />
      </div>
      <div className="home-page--review column">
        <p>Review</p>
        <Task data={todos.review} fetchTodos={fetchTodos} next="done" back="inProgress" />
      </div>
      <div className="home-page--done column">
        <p>Done</p>
        <Task data={todos.done} fetchTodos={fetchTodos} back="review" />
      </div>
    </div>
  );
};

export default HomePage;
