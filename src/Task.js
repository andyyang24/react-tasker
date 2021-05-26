import React from "react";

export default function Task({ task, toggleTaskState }) {
  function handleTaskClick() {
    toggleTaskState(task.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.complete}
          onChange={handleTaskClick}
        />
        {task.name}
      </label>
    </div>
  );
}
