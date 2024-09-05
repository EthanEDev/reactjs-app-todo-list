import React, { useRef, useState } from "react";
import ToDo from "./components/todo";
import AddIcon from "./icons/add.png";
import "./App.scss";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputTextRef = useRef(null);
  return (
    <div className="container">
      <h2 className="title">ToDo List</h2>
      <form className="form">
        <input
          value={inputValue}
          ref={inputTextRef}
          type="text"
          placeholder="Add a task..."
          onChange={(e) => setInputValue(e.target.value)}
        />

        <input
          type="image"
          title="add to list"
          alt="Submit"
          src={AddIcon}
          onClick={(e) => {
            e.preventDefault();
            setTasks([...tasks, inputValue]);
            setInputValue("");
            inputTextRef.current.focus();
          }}
        />
      </form>
      <div className="list">
        {tasks.length === 0 ? (
          <div className="empty">There is no task to do!</div>
        ) : (
          tasks.map((task, id) => (
            <ToDo
              task={task}
              id={id}
              key={id}
              handleDelete={() => setTasks(tasks.filter((_, i) => id !== i))}
            />
          ))
        )}
      </div>
    </div>
  );
}
