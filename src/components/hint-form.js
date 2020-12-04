import React, {useState} from 'react';
import { useDispatch } from "react-redux"
import { setHint } from "../reducers/vocab-reducer";

const HintForm = ({currentIndex}) => {
  const dispatch = useDispatch()
  const [showInput, setShowInput] = useState(false)

  const handleHint = (e, index) => {
    e.preventDefault()
    const hint = e.target.hint.value
    dispatch(setHint(index, hint))
    setShowInput(false)
  }

  return(
    <>
    <button className="add-hint" onClick={() => {setShowInput(!showInput)}}>
      {showInput ? "X" : "Add hint"}
    </button> 
    {!showInput ?
    null: 
    <div className="hint-form">
      <form onSubmit={(e) => handleHint(e, currentIndex)}>
        <input placeholder="Hint" type="text" name="hint"/>
        <button>Add</button>
      </form>
    </div>
    }
    </>
  )
}

export default HintForm