import React, {useRef} from 'react'
import {setLocation} from "../reducers/nav-reducer"
import {useDispatch, useSelector} from "react-redux"
import {setUser} from "../reducers/user-reducer"


const MobileNav = () => {
	const dispatch = useDispatch()
  const user = useSelector(s => s.user)
  const vocab = useSelector(s => s.words)
  const mobileMenuRef = useRef()


	const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const setLoc = (loc) => {
    dispatch(setLocation(loc))
    mobileMenuRef.current.checked = false
  }

	return(	
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
			<div id="login" onClick={() => setLoc("login")}>Log In</div>
			<div id="signup" onClick={() => setLoc("signup")}>Sign Up</div>
			</>}
		</div>
	)
}

export default MobileNav