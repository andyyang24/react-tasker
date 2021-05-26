import React from "react";
import Task from "./Task";

export default function TaskList({ tasks, toggleTaskState }) {
  return tasks.map((task) => {
    return <Task key={task.id} task={task} toggleTaskState={toggleTaskState} />;
  });
}
