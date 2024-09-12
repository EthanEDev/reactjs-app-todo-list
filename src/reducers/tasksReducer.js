export const tasksReducer = (state, action) => {
  // Create a copy of the current state to avoid direct mutation
  const newState = { ...state };
  switch (action.type) {
    // Update input field for adding new tasks
    case "UPDATE_INPUT_TEXT":
      newState.newTask = action.payload;
      break;
    // Add a new task to the task list
    case "ADD_TASK":
      action.payload.preventDefault();
      newState.tasks.push({
        text: newState.newTask,
        editedText: "",
        done: false,
      });
      newState.newTask = "";
      // action.payload.input.current.focus();
      break;
    case "EDIT_TASK":
      // newState.tasks[action.payload].text =
      //   newState.tasks[action.payload].editedText;
      break;
    // Mark a task as done or undo it
    case "DONE_TASK":
      newState.tasks[action.payload].done =
        !newState.tasks[action.payload].done;
      break;
    // Delete a task from the task list
    case "DELETE_TASK":
      newState.tasks.splice(action.payload, 1);
      break;
    default:
      break;
  }
  // Store the updated task list in localStorage to persist data
  localStorage.setItem("copy-tasks", JSON.stringify(newState.tasks));
  // Return the updated state
  return newState;
};
// Initial state for the app, loading tasks from localStorage or initializing an empty task list
export const initState = {
  tasks: JSON.parse(localStorage.getItem("copy-tasks")) ?? [],
  newTask: "",
};
