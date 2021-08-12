import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import classes from "./AddItemForm.module.css";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export type addItemFormProps = {
  onAddItem: (value: string) => void
}

export function AddItemForm(props: addItemFormProps) {
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

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
      <TextField type="text"
                 value={inputValue}
                 color='primary'
                 variant="outlined"
                 label="Enter value"
                 size='small'
                 required
                 error={error}
                 helperText={error ? "Incorrect entry." : ""}
                 onChange={updateInputValueHandler}
                 onKeyPress={keyPressHandler}/>
      <Button onClick={addNewTasksHandler} color="primary" variant="contained" size="large">+</Button>
    </div>
  )
}