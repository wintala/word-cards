import React, {useEffect, useRef} from 'react';
import CardDisplayer from "./components/card-displayer"
import FileForm from "./components/file-form"
import Info from "./components/info";
import List from "./components/list"
import LoginForm from "./components/login-form"
import SignupForm from "./components/signup-form"
import Notification from "./components/notification"
import {useDispatch, useSelector} from "react-redux"
import {setLocation} from "./reducers/nav-reducer"
import {setUser} from "./reducers/user-reducer"


const App = () => {
  // Todo: React router ja async action cretorit (thunk)
  const  dispatch = useDispatch()
  const navLocation = useSelector(s => s.navLoc)
  const user = useSelector(s => s.user)
  const vocab = useSelector(s => s.words)
  const mobileMenuRef = useRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
		}
	}, [dispatch])

  const content = (navLocation) => {
    switch (navLocation) {
      case "start":
        return(<FileForm />)
      case "list":
        return(<List />)
      case "cards":
        return(<CardDisplayer />)
      case "login":
        return(<LoginForm prevLocation={navLocation}/>)
      case "signup":
          return(<SignupForm />)
      case "info":
            return(<Info />)
      default:
        return <FileForm />
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const setLoc = (loc) => {
    dispatch(setLocation(loc))
    mobileMenuRef.current.checked = !mobileMenuRef.current.checked
  }


  return (
    <>
      <Notification />
      <div className="mobile-nav-wrap">
        <input type="checkbox" ref={mobileMenuRef} className="toggler" />
        <div className="mobile-nav-menu">
          <div onClick={() => setLoc("start")}>Start</div>
          <div onClick={() => setLoc("info")}>Info</div>
          {vocab ?
          <>
          <div onClick={() => setLoc("cards")}>Cards</div>
          <div onClick={() => setLoc("list")}>Manage</div> 
          </> : null}
        </div>
        <div className="mobile-nav-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {user ? 
          <>
          <div id="logout" onClick={handleLogout}>Log Out</div>
          <div id="loggedin">{`Logged in ${user.username}`}</div>
          </> :
          <>
          <div id="login" onClick={() => dispatch(setLocation("login"))}>Log In</div>
          <div id="signup" onClick={() => dispatch(setLocation("signup"))}>Sign Up</div>
          </>}
      </div>
      <div className="nav">
        <button onClick={() => dispatch(setLocation("start"))}>Start</button>
        <button onClick={() => dispatch(setLocation("info"))}>Info</button>
        {vocab ?
        <>
        <button onClick={() => dispatch(setLocation("cards"))}>Cards</button>
        <button onClick={() => dispatch(setLocation("list"))}>Manage</button> 
        </> : null}
        {user ? 
        <>
        <button id="logout" onClick={handleLogout}>Log Out</button>
        <div id="loggedin">{`Logged in ${user.username}`}</div>
        </> :
        <>
        <button id="login" onClick={() => dispatch(setLocation("login"))}>Log In</button>
        <button id="signup" onClick={() => dispatch(setLocation("signup"))}>Sign Up</button>
        </>}
      </div>
      {content(navLocation)}
    </>
  )
}

export default App;
