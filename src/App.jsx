import React, { useReducer } from "react";
import ToDo from "./components/todo";
import AddIcon from "./icons/add.png";
import "./App.scss";
import { tasksReducer, initState } from "./reducers/tasksReducer";

export default function App() {
  const [state, dispatch] = useReducer(tasksReducer, initState);
  const updateText = (e) => {
    dispatch({ type: "UPDATE_INPUT_TEXT", payload: e.target.value });
  };
  const addTask = (e) => {
    dispatch({ type: "ADD_TASK", payload: e });
  };
  const doneTask = (index) => {
    dispatch({ type: "DONE_TASK", payload: index });
  };
  const deleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };
  return (
    <div className="container">
      <h2 className="title">ToDo List</h2>
      <form className="form" onSubmit={addTask}>
        <input
          value={state.newTask}
          type="text"
          placeholder="Add a task..."
          onChange={(e) => updateText(e)}
        />

        <input
          type="image"
          title="add to list"
          alt="Submit"
          src={AddIcon}
        />
      </form>
      <div className="list">
        {state.tasks.length === 0 ? (
          <div className="empty">There is no task to do!</div>
        ) : (
          state.tasks.map((task, index) => (
            <ToDo
              task={task}
              id={index}
              key={index}
              handleDelete={deleteTask}
              handleDone={doneTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
