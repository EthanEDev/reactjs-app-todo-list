import React, { useState } from "react";
import CheckedIcon from "../icons/check.png";
import UncheckedIcon from "../icons/uncheck.png";
import TrashIcon from "../icons/trash.png";
import "./todo.scss";

export default function ToDo({ task, id, handleDelete }) {
  const [isDone, setIsDone] = useState(false);

  return (
    <div key={id} className={"taskContainer"+(isDone ? " checked" : "")} >
      <div className="task" onClick={() => setIsDone(!isDone)}>
        <img src={isDone ? CheckedIcon : UncheckedIcon} alt="" title="done" />
        <p className={isDone ? "checked" : ""}>{task}</p>
      </div>
      <div className="delete" title="delete">
        <img src={TrashIcon} alt="" onClick={handleDelete} />
      </div>
    </div>
  );
}
