import React from 'react';
import classes from "./TodoList.module.css";
import {filterType, tasksItemType} from "../../App";
import {TodoListItem} from "./TodoListItem/TodoListItem";
import {AddItemForm} from "../UI/AddItemForm";
import {EditableSpan} from "../UI/EditableSpan";

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
    <div className={classes.todoList}>
      <button onClick={deleteTodoListHandler}>Delete todolist</button>
      <h2>
        <EditableSpan title={props.title} onUpdateTitle={updateTodoListTitleHandler}/>
      </h2>
      <AddItemForm onAddItem={addNewTaskHandler}/>
      <div>
        <ul>
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
      <div className={classes.controls}>
        <button className={props.filterValue === "ALL" ? classes.active : ""} onClick={allFilterHandler}>All</button>
        <button className={props.filterValue === "ACTIVE" ? classes.active : ""} onClick={activeFilterHandler}>Active
        </button>
        <button className={props.filterValue === "COMPLETED" ? classes.active : ""}
                onClick={completedFilterHandler}>Completed
        </button>
      </div>
    </div>
  );
}

