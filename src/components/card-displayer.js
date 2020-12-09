import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { pinWord } from "../reducers/vocab-reducer";
import HintForm from "./hint-form"


const CardDisplayer = () => {
  const dispatch = useDispatch()
  const vocabulary = useSelector(state => state.words)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [side, setSide] = useState(0)
  const [pinMode, setPinMode] = useState(false)
  const wrap = useRef()

  // näppäinten kuuntelua varten
  useEffect(() => {
    if (wrap.current) {
      wrap.current.focus()
    }
  })

  if (!vocabulary) {
    return (
      <div className="load-wrap-main">
        <div className="spin-loading"></div>
      </div>
    )
  }

  const pinnedIndecies = vocabulary.pairs.filter(x => x.pinned).map(x => vocabulary.pairs.indexOf(x))

  const wordPair = vocabulary.pairs[currentIndex]

  const isFirstPair = currentIndex === 0 || (pinMode && pinnedIndecies.indexOf(currentIndex) === 0)
  const isLastPair = currentIndex === vocabulary.pairs.length - 1 || (pinMode && pinnedIndecies.indexOf(currentIndex) === pinnedIndecies.length - 1)


  const handeNext = () => {
    if (!pinMode) {
      setCurrentIndex(currentIndex + 1)
    }
    else {
      setCurrentIndex(pinnedIndecies[pinnedIndecies.indexOf(currentIndex) + 1])
    }
  }

  const handlePrevious = () => {
    if (!pinMode) {
      setCurrentIndex(currentIndex - 1)
    }
    else {
      setCurrentIndex(pinnedIndecies[pinnedIndecies.indexOf(currentIndex) - 1])
    }
  }

  const nextButton = () => (
    isLastPair ? null : <button className="basic-button" onClick={handeNext}>Next</button>
  )

  const previousButton = () => (
    isFirstPair ? null :<button className="basic-button" onClick={handlePrevious}>Previous</button>
  )

  const pinnButton = () => (
    !pinMode ? <button className="pinn-button" onClick={() => dispatch(pinWord(currentIndex))}>{wordPair.pinned ? "Unpinn" : "Pinn"}</button> : null
  )

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

  const counter = () => {
    const current = pinMode ? pinnedIndecies.indexOf(currentIndex) + 1 : currentIndex + 1
    const total = pinMode ? pinnedIndecies.length : vocabulary.pairs.length
    return (
      <div>{`${current}/${total}`}</div>
    )
  }

  const handeKeyPress = (e) => {
    const code = e.keyCode
    if (code === 39 && !isLastPair) {
      handeNext()
    } 
    else if (code === 37 && !isFirstPair) {
      handlePrevious()
    }
    else if (code === 32) {
      setSide(Math.abs(side - 1))
    }
    else if (code === 80 && !pinMode) {
      dispatch(pinWord(currentIndex))
    }
  }

  return (
    <div id="card-wrap" ref={wrap} onKeyDown={handeKeyPress} tabIndex="0">
      {counter()}
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
      <div id="card-tip">Keyboard controls: Press space to flip the card, arrow keys to move between card and P to pinn the card</div>
    </div>
  )
}

export default CardDisplayer