import React, {useEffect} from 'react';
import CardDisplayer from "./components/card-displayer"
import FileForm from "./components/file-form"
import Info from "./components/info";
import List from "./components/list"
import LoginForm from "./components/login-form"
import SignupForm from "./components/signup-form"
import NavBar from "./components/navbar"
import MobileNav from "./components/mobile-navbar";
import Notification from "./components/notification"
import {useDispatch, useSelector} from "react-redux"
import {setUser} from "./reducers/user-reducer"


const App = () => {
  // Todo: React router ja async action cretorit (thunk)
  const  dispatch = useDispatch()
  const navLocation = useSelector(s => s.navLoc)

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
        return(<LoginForm />)
      case "signup":
          return(<SignupForm />)
      case "info":
            return(<Info />)
      default:
        return <FileForm />
    }
  }

  return (
    <>
      <Notification />
      <MobileNav />
      <NavBar />
      {content(navLocation)}
    </>
  )
}

export default App;
