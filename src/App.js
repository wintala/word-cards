import React, {useState} from 'react';
import CardDisplayer from "./components/card-displayer"
import FileForm from "./components/file-form"
import List from "./components/list"


const App = () => {
  // Todo: korvaa react routerilla
  const [navLocation, setNavLocation] = useState("start")

  const content = () => {
    switch (navLocation) {
      case "start":
        return(<FileForm setNavLocation={setNavLocation} />)
      case "list":
        return(<List />)
      case "cards":
        return(<CardDisplayer />)
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
