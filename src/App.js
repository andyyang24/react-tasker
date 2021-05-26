import React, { useState, useRef, useEffect } from "react";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "taskApp.tasks";

function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), name: "Morning Meeting", complete: true },
    { id: uuidv4(), name: "Team Chatting", complete: false },
  ]);

  const taskNameRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function toggleTaskState(id) {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  function handleAddTask() {
    const name = taskNameRef.current.value;
    if (name === "") return;
    setTasks((prevTask) => {
      return [...prevTask, { id: uuidv4(), name: name, complete: false }];
    });
    taskNameRef.current.value = null;
  }

  function handleClearCompletedTasks() {
    const newTasks = tasks.filter((task) => !task.complete);
    setTasks(newTasks);
  }

  return (
    <>
      <TaskList tasks={tasks} toggleTaskState={toggleTaskState} />
      <input ref={taskNameRef} type="text" />
      <button onClick={handleAddTask}>Add New Task</button>
      <button onClick={handleClearCompletedTasks}>Clear Completed Task</button>
      <div>
        Total {tasks.filter((task) => !task.complete).length} task(s) to do.
      </div>
    </>
  );
}

export default App;
