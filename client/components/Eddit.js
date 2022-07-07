import React, { useState } from "react"
import { TextInput } from "react-native"

const Eddit = ({ value, setValue }) => {
  const [editingValue, setEditingValue] = useState(value)

  const onChange = (e) => setEditingValue(e.target.value)

  const onBlur = (e) => {
    if (e.target.value.trim() === "") {
      setEditingValue(value)
    } else {
      setValue(e.target.value)
    }
  }

  return (
    <TextInput
      type="text"
      value={editingValue}
      onChange={onChange}
      placeholderTextColor={"#fff"}
      onBlur={onBlur}
    />
  )
}

export default Eddit
