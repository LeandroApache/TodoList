import React from 'react';
import {EditableSpan} from "../../UI/EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  checkbox: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
});


export type todoListItemPropsType = {
  title: string
  isDone: boolean
  onChangeStatus: () => void
  onDeleteTask: () => void
  onUpdateTaskTitle: (title: string) => void
}

export function TodoListItem(props: todoListItemPropsType) {
  const classes = useStyles();
  return (
    <li className={classes.checkbox}>
      <Checkbox
        color="default"
        inputProps={{'aria-label': 'checkbox with default color'}}
        checked={props.isDone}
        onClick={props.onChangeStatus}
      />
      <EditableSpan onUpdateTitle={props.onUpdateTaskTitle} title={props.title}/>
      <IconButton aria-label="delete" size="small" edge="start" onClick={props.onDeleteTask}>
        <DeleteIcon/>
      </IconButton>
    </li>
  );
}

