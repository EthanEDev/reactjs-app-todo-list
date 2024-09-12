import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  newTask: "",
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    // Initializes tasks from an external source (e.g., localStorage)
    initTasks: (state, action) => {
      state.tasks = action.payload;
    },

    // Updates the input text for the task to be added
    updateInputText: (state, action) => {
      state.newTask = action.payload;
    },

    // Adds a new task to the task list
    addTask: (state) => {
      state.tasks.push({
        text: state.newTask,
        editedText: "",
        done: false,
      });
      state.newTask = ""; // Clears the input field after task is added
      // action.payload.input.current.focus();
    },

    //@TODO Currently commented out: Would allow editing of an existing task
    editTask: (state, action) => {
      // state.tasks[action.payload].text =
      // state.tasks[action.payload].editedText;
    },

    // Toggles the 'done' status of the task at the specified index
    doneTask: (state, action) => {
      state.tasks[action.payload].done =
      !state.tasks[action.payload].done;
    },
    
    // Deletes the task at the specified index
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
  },
})

// Action creators are generated for each case reducer function
export const { initTasks, updateInputText, addTask, editTask, doneTask, deleteTask } = todoSlice.actions

export default todoSlice.reducer