import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {setLocation} from "../reducers/nav-reducer"
import {setUser} from "../reducers/user-reducer"

const NavBar = () => {
	const dispatch = useDispatch()
  const user = useSelector(s => s.user)
	const vocab = useSelector(s => s.words)

	const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
	}
	
	return(
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
	)
}

export default NavBar