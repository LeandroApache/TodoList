import React from 'react';
import classes from "./TodoList.module.css";
import {filterType, tasksItemType} from "../../App";
import {TodoListItem} from "./TodoListItem/TodoListItem";
import {AddItemForm} from "../UI/AddItemForm";
import {EditableSpan} from "../UI/EditableSpan";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    padding: 10,
    textAlign: "center"
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
});


export type todolistPropsType = {
  tasks: Array<tasksItemType>
  title: string
  id: string
  filterValue: filterType
  onAddTask: (title: string, todoListId: string) => void
  onChangeStatus: (id: string, todoListId: string) => void
  onChangeFilter: (value: filterType, todoListId: string) => void
  onDeleteTask: (id: string, todoListId: string) => void
  onDeleteTodoList: (todoListId: string) => void
  onUpdateTaskTitle: (taskId: string, newTaskTitle: string, todoListId: string) => void
  onUpdateTodoListTitle: (newTaskTitle: string, todoListId: string) => void
}

export function TodoList(props: todolistPropsType) {
  const classes = useStyles();

  const allFilterHandler = () => {
    props.onChangeFilter("ALL", props.id);
  }
  const activeFilterHandler = () => {
    props.onChangeFilter("ACTIVE", props.id);
  }
  const completedFilterHandler = () => {
    props.onChangeFilter("COMPLETED", props.id);
  }
  const deleteTodoListHandler = () => {
    props.onDeleteTodoList(props.id);
  }
  const addNewTaskHandler = (taskTitle: string) => {
    props.onAddTask(taskTitle, props.id)
  }
  const updateTodoListTitleHandler = (title: string) => {
    props.onUpdateTodoListTitle(title, props.id);
  }

  return (
    <Paper className={classes.paper}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon/>}
        onClick={deleteTodoListHandler}
      >Delete TodoList</Button>
      <h2>
        <EditableSpan title={props.title} onUpdateTitle={updateTodoListTitleHandler}/>
      </h2>
      <AddItemForm onAddItem={addNewTaskHandler}/>
      <div>
        <ul className={classes.list}>
          {props.tasks.map(el => {
            const changeStatusHandler = () => {
              props.onChangeStatus(el.id, props.id);
            }
            const deleteTaskHandler = () => {
              props.onDeleteTask(el.id, props.id);
            }
            const updateTaskTitleHandler = (newTaskTitle: string) => {
              props.onUpdateTaskTitle(el.id, newTaskTitle, props.id);
            }
            return <TodoListItem
              key={el.id}
              title={el.title}
              isDone={el.isDone}
              onChangeStatus={changeStatusHandler}
              onDeleteTask={deleteTaskHandler}
              onUpdateTaskTitle={updateTaskTitleHandler}/>
          })}
        </ul>
      </div>
      <div>
        <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
          <Button variant="contained" size="small" color={props.filterValue === "ALL" ? "secondary" : "primary"} onClick={allFilterHandler}>All</Button>
          <Button variant="contained" size="small" color={props.filterValue === "ACTIVE" ? "secondary" : "primary"} onClick={activeFilterHandler}>Active
          </Button>
          <Button variant="contained" size="small" color={props.filterValue === "COMPLETED" ? "secondary" : "primary"}
                  onClick={completedFilterHandler}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
}

