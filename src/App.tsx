import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./Components/TodoList/TodoList";
import {AddItemForm} from "./Components/UI/AddItemForm";
import Grid, {GridSpacing} from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    padding: 10,
  },
});

export type tasksType = {
  [a: string]: Array<tasksItemType>
}
export type tasksItemType = {
  id: string
  title: string
  isDone: boolean
};
export type filterType = "ALL" | "ACTIVE" | "COMPLETED";
export type todoListType = {
  id: string
  title: string
  filter: filterType
}
const todoListId1 = v1();
const todoListId2 = v1();

function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState<tasksType>({
    [todoListId1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: true},
      {id: v1(), title: "Redux", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Phone", isDone: true},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Beer", isDone: true},
    ]
  })
  const [todoLists, setTodoLists] = useState<Array<todoListType>>([
    {id: todoListId1, title: "What to learn", filter: "ALL"},
    {id: todoListId2, title: "What to buy", filter: "ACTIVE"},
  ])

  const addNewTaskHandler = (title: string, todoListId: string) => {
    let newTask = {
      id: v1(), title, isDone: false
    }
    tasks[todoListId].push(newTask);
    setTasks({...tasks});
  }
  const deleteTaskHandler = (id: string, todoListId: string) => {
    let updatedTasks = tasks[todoListId].filter(t => t.id !== id);
    tasks[todoListId] = updatedTasks;
    setTasks({...tasks});
  }
  const changeStatusHandler = (id: string, todoListId: string) => {
    const newTasks = tasks[todoListId].map(el => el.id === id ? {...el, isDone: !el.isDone} : el);
    tasks[todoListId] = newTasks;
    setTasks({...tasks});
  }
  const updateTaskTitleHandler = (taskId: string, newTaskTitle: string, todoListId: string) => {
    const currentTask = tasks[todoListId].find(t => t.id === taskId);
    if (currentTask) {
      currentTask.title = newTaskTitle;
    }
    setTasks({...tasks});
  }

  const addNewTodoListHandler = (newTitle: string) => {
    const newTodoList: todoListType = {id: v1(), title: newTitle, filter: "ALL"};
    setTodoLists([newTodoList, ...todoLists]);
    tasks[newTodoList.id] = [];
  }
  const deleteTodoListHandler = (todoListId: string) => {
    let newTodoLists = todoLists.filter(tl => tl.id != todoListId);
    setTodoLists(newTodoLists);
    delete tasks[todoListId];
  }
  const changeFilterHandler = (newFilterValue: filterType, todoListId: string) => {
    let newTodoLists: Array<todoListType> = todoLists.map(tl => tl.id === todoListId ? {
      ...tl,
      filter: newFilterValue
    } : tl)
    setTodoLists(newTodoLists);
  }
  const updateTodoListTitleHandler = (newTaskTitle: string, todoListId: string) => {
    const updatedTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTaskTitle} : tl)
    setTodoLists(updatedTodoLists);
  }

  return (
    <div className="App">
      <Grid container spacing={5}>
        <Grid container justifyContent="center"
              alignItems="center" item xs={12}>
          <Paper className={classes.paper}>
            <AddItemForm onAddItem={addNewTodoListHandler}/>
          </Paper>
        </Grid>
        <Grid item xs={12} container justifyContent="space-around" alignItems="flex-start" spacing={2}>
          {todoLists.map(tl => {
            let filteredTasks = tasks[tl.id];
            if (tl.filter === "ACTIVE") {
              filteredTasks = tasks[tl.id].filter(t => !t.isDone)
            }
            if (tl.filter === "COMPLETED") {
              filteredTasks = tasks[tl.id].filter(t => t.isDone)
            }
            return <Grid item>
              <TodoList key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filterValue={tl.filter}
                        onAddTask={addNewTaskHandler}
                        onChangeStatus={changeStatusHandler}
                        onChangeFilter={changeFilterHandler}
                        onDeleteTask={deleteTaskHandler}
                        onDeleteTodoList={deleteTodoListHandler}
                        onUpdateTaskTitle={updateTaskTitleHandler}
                        onUpdateTodoListTitle={updateTodoListTitleHandler}/>
            </Grid>
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
