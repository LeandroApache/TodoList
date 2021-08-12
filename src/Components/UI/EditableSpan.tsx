import React, {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';

export type EditableSpanProps = {
  title: string
  onUpdateTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const onEditModeHandler = () => {
    setTitle(props.title);
    return setEditMode(true);
  }
  const offEditModeHandler = () => {
    props.onUpdateTitle(title);
    return setEditMode(false);
  };
  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  return (
    <span>
      {editMode
        ? <TextField type="text"
                     value={title}
                     color='primary'
                     size="small"
                     label="Enter new text"
                     onChange={updateTitleHandler}
                     onBlur={offEditModeHandler}
                     autoFocus={true}/>
        : <span onDoubleClick={onEditModeHandler}>{props.title}</span>}
    </span>
  )
}