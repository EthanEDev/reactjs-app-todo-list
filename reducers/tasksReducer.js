export const tasksReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "UPDATE_INPUT_TEXT":
      newState.newTask = action.payload;
      break;

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
      newState.tasks[action.payload].text =
        newState.tasks[action.payload].editedText;
      break;

    case "DONE_TASK":
      newState.tasks[action.payload].done =
        !newState.tasks[action.payload].done;
      break;

    case "DELETE_TASK":
      newState.tasks.splice(action.payload, 1);
      break;

    default:
      break;
  }

  localStorage.setItem("copy-tasks", JSON.stringify(newState.tasks));

  return newState;
};

export const initState = {
  tasks: JSON.parse(localStorage.getItem("copy-tasks")) ?? [],
  newTask: "",
};
