import React, {useState} from 'react';
import { readString } from 'react-papaparse'
import { useSelector, useDispatch } from "react-redux"
import { setWords, setHint, pinWord } from "./reducer";


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

const Card = () => {
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


const List = () => {
  const wordPairs = useSelector(state => state)

  return(
    <table>
      <tbody>
        {wordPairs.map(p => 
        <tr key={p.pair[0]}>
          <td>
            {p.pair[0]}
          </td>
          <td>
            {p.pair[1]}
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

const FileForm = ({setNavLocation}) => {
  const dispatch = useDispatch()

  const handleFileUpload = (file) => {
    const reader = new FileReader()

    reader.onload = async (fileData) => { 
      const text = fileData.target.result
      const arr = readString(text)
      dispatch(setWords(
        arr.data.map(x => (
          {pair: x, pinned: false, hint: ""}
        ))
      ))
      setNavLocation("cards")
    }

    reader.readAsText(file)
  }

  return (
      <div>
        <h1 className="header">
          Welcome
        </h1>
        <form>
          <input onChange={(e) => handleFileUpload(e.target.files[0])} type="file" id="file" name="uploadFile" accept=".txt, .csv"/>
          <label for="file">
            <figure><svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 20 17">
                <path
                  d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
                </path>
              </svg></figure>
          </label>
        </form>
        <div className="instruction">
          Add one csv file with following structure to begin:
        <table className="example">
          <tbody>
            <tr>
              <td></td>
              <td>A</td>
              <td>B</td>
            </tr>
            <tr>
              <td>1</td>
              <td>word1</td>
              <td>translation1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>word2</td>
              <td>translation2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>word3</td>
              <td>translation3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>word4</td>
              <td>translation4</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
  )
}

const App = () => {
  const [navLocation, setNavLocation] = useState("start")

  const content = () => {
    switch (navLocation) {
      case "start":
        return(<FileForm setNavLocation={setNavLocation} />)
      case "list":
        return(<List />)
      case "cards":
        return(<Card />)
      default:
        return <FileForm />
    }
  }

  return (
    <>
    {navLocation !== "start" ?
      <div className="nav">
        <button onClick={() => setNavLocation("cards")}>Cards</button>
        <button onClick={() => setNavLocation("list")}>List</button>
      </div> :
      null}
      {content()}
    </>
  )
}

export default App;
