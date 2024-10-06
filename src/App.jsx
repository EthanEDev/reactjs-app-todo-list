import { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { initTasks } from "./store/slices/todoSlice";
import Form from "./components/form/form";
import Tasks from "./components/tasks/tasks";

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

  return (
    <div className="container">
      <h2 className="title">ToDo List</h2>
      <Form />
      <Tasks />
    </div>
  );
}
