import { useEffect } from "react";
import ToDo from "./components/todo";
import AddIcon from "./icons/add.png";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  initTasks,
  updateInputText,
  addTask,
  doneTask,
  deleteTask,
} from "./store/slices/todoSlice";

export default function App() {
  // Extract tasks from the Redux store's todo slice
  const state = useSelector((store) => store.todo);
  // Create a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // This will trigger only once at mount to load tasks from localStorage
  useEffect(() => {
    // Dispatch action to initialize tasks from localStorage, or set an empty array if no tasks are found
    dispatch(initTasks(JSON.parse(localStorage.getItem("tasks")) ?? []));
  }, [dispatch]); // Including dispatch is unnecessary but it becomes a habit to always specify all dependencies correctly.

  // This will trigger every time `tasks` changes to update the localStorage
  useEffect(() => {
    // Save the updated tasks array in localStorage as a string
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state]); // Dependency on tasks ensures this effect runs only when tasks change

  // Dispatches an action to update the task input text
  const handleUpdateText = (e) => {
    dispatch(updateInputText(e.target.value));
  };

  // Dispatches an action to add a new task
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTask());
  };

  // Dispatches an action to toggle the task as done/undone
  const handleDone = (index) => {
    dispatch(doneTask(index));
  };

  // Dispatches an action to delete a task
  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <div className="container">
      <h2 className="title">ToDo List</h2>
      <form className="form" onSubmit={(e) => handleAdd(e)}>
        <input
          value={state.newTask}
          type="text"
          placeholder="Add a task..."
          onChange={(e) => handleUpdateText(e)}
        />
        <input type="image" title="add to list" alt="Submit" src={AddIcon} />
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
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
          ))
        )}
      </div>
    </div>
  );
}
