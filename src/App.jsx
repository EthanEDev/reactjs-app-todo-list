import React, { useReducer } from "react";
import ToDo from "./components/todo";
import AddIcon from "./icons/add.png";
import "./App.scss";
import { tasksReducer, initState } from "./reducers/tasksReducer";

export default function App() {
  // useReducer to manage the state with tasksReducer and initial state
  const [state, dispatch] = useReducer(tasksReducer, initState);
  // Dispatch action to update input text in state
  const updateText = (e) => {
    dispatch({ type: "UPDATE_INPUT_TEXT", payload: e.target.value });
  };
  // Dispatch action to add a new task
  const addTask = (e) => {
    dispatch({ type: "ADD_TASK", payload: e });
  };
  // Dispatch action to mark a task as done
  const doneTask = (index) => {
    dispatch({ type: "DONE_TASK", payload: index });
  };
  // Dispatch action to delete a task
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
