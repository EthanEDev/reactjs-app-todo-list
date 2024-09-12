import React, { useEffect, useRef, useState } from "react";
import CheckedIcon from "../icons/check.png";
import UncheckedIcon from "../icons/uncheck.png";
import TrashIcon from "../icons/trash.png";
import "./todo.scss";

export default function ToDo({ task, id, handleDelete, handleDone }) {
  return (
    <div key={id} className={"taskContainer"+(task.done ? " checked" : "")} >
      <div className="task" onClick={() => handleDone(id)}>
        <img src={task.done ? CheckedIcon : UncheckedIcon} alt="" title="done" />
        <p className={task.done ? "checked" : ""}>{task.text}</p>
      </div>
      <div className="delete" title="delete">
        <img src={TrashIcon} alt="" onClick={handleDelete} />
      </div>
    </div>
  );
}
