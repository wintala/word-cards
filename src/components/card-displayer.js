import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { pinWord } from "../reducer";
import HintForm from "./hint-form"


const CardDisplayer = () => {
  const dispatch = useDispatch()
  const wordPairs = useSelector(state => state)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [side, setSide] = useState(0)
  const [pinMode, setPinMode] = useState(false)

  if (wordPairs.length === 0) {
    return null
  }

  const pinnedIndecies = wordPairs.filter(x => x.pinned).map(x => wordPairs.indexOf(x))

  let wordPair = wordPairs[currentIndex]

  const nextButton = () => {
    const handeNext = () => {
      if (!pinMode) {
        setCurrentIndex(currentIndex + 1)
      }
      else {
        setCurrentIndex(pinnedIndecies[pinnedIndecies.indexOf(currentIndex) + 1])
      }
    }

    return(
      currentIndex === wordPairs.length - 1 || (pinMode && pinnedIndecies.indexOf(currentIndex) === pinnedIndecies.length - 1) ?
      null :
      <button className="basic-button" onClick={handeNext}>Next</button>
    )
  }

  const previousButton = () => {
    const handlePrevious = () => {
      if (!pinMode) {
        setCurrentIndex(currentIndex - 1)
      }
      else {
        setCurrentIndex(pinnedIndecies[pinnedIndecies.indexOf(currentIndex) - 1])
      }
    }

    return(
      currentIndex === 0 || (pinMode && pinnedIndecies.indexOf(currentIndex) === 0) ?
      null :
      <button className="basic-button" onClick={handlePrevious}>Previous</button>
    )
  }



  const pinnButton = () => {
    const handlepinning = () => {
      dispatch(pinWord(currentIndex))
    }
  
    return(
      !pinMode ? 
      <button className="pinn-button" onClick={handlepinning}>{wordPairs[currentIndex].pinned ? "Unpinn" : "Pinn"}</button> :
      null
    )
  }

  const pinnModeButton = () => {
    const handlePinMode = () => {
      setPinMode(true)
      setCurrentIndex(pinnedIndecies[0])
    }

    return(
      !pinMode && currentIndex === wordPairs.length - 1 && pinnedIndecies.length !== 0 ?
      <button className="pinn-mode-button" onClick={handlePinMode}>View pinned cards</button> :
      null
    )
  }

  const exitPinnModeButton = () => {
    const handleExitPinMode = () => {
      setPinMode(false)
      setCurrentIndex(0)
    }

    return(
      pinMode && pinnedIndecies.indexOf(currentIndex) === pinnedIndecies.length - 1 ?
      <button className="pinn-mode-button" onClick={handleExitPinMode}>View all cards</button> :
      null
    )

  }

  return (
    <div>
      <div key={side} className="card">
        {pinnButton()}
        <HintForm currentIndex={currentIndex} />
        <div className="word" onClick={() => setSide(Math.abs(side - 1))}>{wordPair.pair[side]}</div>
        <div className="hint-text">
          {wordPair.hint ? "Hint: " + wordPair.hint : null}
        </div>
      </div>
      <div className="next-prev-wrap"> 
        {previousButton()}
        {nextButton()}
      </div>
      {pinnModeButton()}
      {exitPinnModeButton()}
    </div>
  )
}

export default CardDisplayer