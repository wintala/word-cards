import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { pinWord } from "../reducers/vocab-reducer";
import HintForm from "./hint-form"


const CardDisplayer = () => {
  const dispatch = useDispatch()
  const vocabulary = useSelector(state => state.words)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [side, setSide] = useState(0)
  const [pinMode, setPinMode] = useState(false)

  if (!vocabulary) {
    return (
      <div className="load-wrap-main">
        <div className="spin-loading"></div>
      </div>
    )
  }

  const pinnedIndecies = vocabulary.pairs.filter(x => x.pinned).map(x => vocabulary.pairs.indexOf(x))

  let wordPair = vocabulary.pairs[currentIndex]

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
      currentIndex === vocabulary.pairs.length - 1 || (pinMode && pinnedIndecies.indexOf(currentIndex) === pinnedIndecies.length - 1) ?
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
      <button className="pinn-button" onClick={handlepinning}>{vocabulary.pairs[currentIndex].pinned ? "Unpinn" : "Pinn"}</button> :
      null
    )
  }

  const pinnModeButton = () => {
    const handlePinMode = () => {
      setPinMode(true)
      setCurrentIndex(pinnedIndecies[0])
    }

    return(
      !pinMode && currentIndex === vocabulary.pairs.length - 1 && pinnedIndecies.length !== 0 ?
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
    <div id="card-wrap">
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