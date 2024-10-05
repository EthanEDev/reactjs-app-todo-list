import { useEffect, useMemo, useState } from "react";
import { deleteTask, doneTask } from "../../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Task from "../task/task";
import Tabs from "../tabs/tabs";
import "./tasks.scss";

export default function Tasks() {
  // Extract tasks from the Redux store's todo slice
  const state = useSelector((store) => store.todo);
  const dispatch = useDispatch();
  // Dispatches an action to toggle the task as done/undone
  const handleDone = (index) => {
    dispatch(doneTask(index));
  };
  // Dispatches an action to delete a task
  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("tab") ?? "all"
  );

  useEffect(() => {
    localStorage.setItem("tab", activeTab);
  }, [activeTab]);

  // Task counting logic, memoized with useMemo to avoid recalculating on every render unless state.tasks changes
  const Counts = useMemo(
    () => ({
      all: state.tasks.length,
      open: state.tasks.filter((task) => !task.done).length,
      done: state.tasks.filter((task) => task.done).length,
    }),
    [state.tasks]
  );

  // Function to determine if a task should be shown based on the selected tab
  const shouldShowTask = (task) => {
    if (activeTab === "open") {
      return !task.done;
    } else if (activeTab === "done") {
      return task.done;
    }
    return true; // Show all for the "all" tab
  };

  // Counting tasks based on activeTab
  const getCounts = () => {
    if (activeTab === "open") {
      return Counts.open;
    } else if (activeTab === "done") {
      return Counts.done;
    }
    return Counts.all;
  };

  // Custom notes based on activeTab
  const getEmptyNote = () => {
    if (activeTab === "all") {
      return "There are no tasks yet!";
    } else if (activeTab === "open") {
      return "You've completed all your tasks!";
    } else if (activeTab === "done") {
      return "You haven't completed any tasks yet!";
    }
  };

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} Counts={Counts} />
      <div className="list">
        {state.tasks.length === 0 ? (
          <div className="empty">There is no task to do!</div>
        ) : getCounts() === 0 ? (
          <div className="empty">{getEmptyNote()}</div>
        ) : (
          state.tasks.map(
            (task, index) =>
              shouldShowTask(task) && (
                <Task
                  task={task}
                  id={index}
                  key={index}
                  handleDelete={handleDelete}
                  handleDone={handleDone}
                />
              )
          )
        )}
      </div>
    </>
  );
}
