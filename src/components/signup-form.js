import React, { useState } from "react"
import service from "../service"
import {setUser} from "../reducers/user-reducer"
import { setNotification } from "../reducers/notification-reducer";
import {setLocation} from "../reducers/nav-reducer"
import {useDispatch} from "react-redux"

const SignupForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		service.signup({username, password})
		.then(res => {service.login({username, password})
			.then(user => {
				dispatch(setUser(user))
				window.localStorage.setItem('loggedUser', JSON.stringify(user))
				dispatch(setLocation("start"))
				dispatch(setNotification("Sign up successful", 2))
			}).catch(e => dispatch(setNotification("User was created, but login failded for some reason", 3)))
		}).catch(e => dispatch(setNotification("Failed to create user", 3)))
	}


	const disableSubmit = ((password !== password2) || (password.length < 4) || (username.length < 1))

	const infoText = (password) ? 
		(password.length < 4) ? 
			"Password must contain atleast 3 characters" : 
			(password2) ?
				(password !== password2) ?
					"Passwords dont match" :
					null :
				null :
		null



	return (
		<form onSubmit={handleLogin} className="user-form">
			<h1>Sign Up</h1>
			<div className="input-container">
				<input
					id="username"
					type="text"
					required
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
				<label>Username</label>
			</div>
			<div className="input-container">
				<input
					id="password"
					type="password"
					required
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<label>Password</label>		
			</div>
			<div className="input-container">
				<input
					id="password2"
					type="password"
					required
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
				/>
				<label>Password Again</label>		
			</div>
			<div className="disabled-info">{infoText}</div>
			<button disabled={disableSubmit} className="login-button">Sign Up</button>
		</form>
	)
}

export default SignupForm