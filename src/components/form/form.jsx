import AddIcon from "../../icons/add.png";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateInputText } from "../../store/slices/todoSlice";
import "./form.scss";

export default function Form() {
  // Extract tasks from the Redux store's todo slice
  const state = useSelector((store) => store.todo);
  // Create a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Dispatches an action to add a new task
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTask());
  };
  // Dispatches an action to update the task input text
  const handleUpdateText = (e) => {
    dispatch(updateInputText(e.target.value));
  };

  return (
    <form className="form" onSubmit={(e) => handleAdd(e)}>
      <input
        value={state.newTask}
        type="text"
        placeholder="Add a task..."
        onChange={(e) => handleUpdateText(e)}
      />
      <input type="image" title="add to list" alt="Submit" src={AddIcon} />
    </form>
  );
}
