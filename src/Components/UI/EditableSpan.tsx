import React, {ChangeEvent, useState} from "react";

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
        ? <input type="text"
                 value={title}
                 onChange={updateTitleHandler}
                 onBlur={offEditModeHandler}
                 autoFocus={true}/>
        : <span onDoubleClick={onEditModeHandler}>{props.title}</span>}
    </span>
  )
}