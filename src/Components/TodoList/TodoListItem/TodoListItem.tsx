import React from 'react';
import classes from "./TodoListItem.module.css";
import {EditableSpan} from "../../UI/EditableSpan";

export type todoListItemPropsType = {
  title: string
  isDone: boolean
  onChangeStatus: () => void
  onDeleteTask: ()=> void
  onUpdateTaskTitle: (title: string) => void
}

export function TodoListItem(props: todoListItemPropsType) {
  return (
    <li className={classes.item} >
      <input id={"input"} type="checkbox" checked={props.isDone} onClick={props.onChangeStatus}/>
      {/*<span>{props.title}</span>*/}
      <EditableSpan onUpdateTitle={props.onUpdateTaskTitle} title={props.title}/>
      <button onClick={props.onDeleteTask}>X</button>
    </li>
  );
}

