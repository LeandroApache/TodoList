import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import classes from "./AddItemForm.module.css";

export type addItemFormProps = {
  onAddItem: (value: string) => void
}

export function AddItemForm(props: addItemFormProps){
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const updateInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInputValue(e.currentTarget.value);
  }
  const addNewTasksHandler = () => {
    if (!inputValue.trim()) {
      setError(true);
    } else {
      props.onAddItem(inputValue);
      setInputValue("");
    }
  }

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
    if (e.code === "Enter") {
      if (!inputValue.trim()) {
        setError(true);
      } else {
        props.onAddItem(inputValue);
        setInputValue("");
      }
    }
  }

  return (
    <div>
      <input type="text"
             value={inputValue}
             className={error ? classes.error : ""}
             onChange={updateInputValueHandler}
             onKeyPress={keyPressHandler}/>
      <button onClick={addNewTasksHandler}>Add new task</button>
      {error && <div className={classes.dropdown}>Invalid input!!!</div>}
    </div>
  )
}