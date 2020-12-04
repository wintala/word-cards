import React, { useState } from "react"
import service from "../service"
import {setUser} from "../reducers/user-reducer"
import {setLocation} from "../reducers/nav-reducer"
import { setNotification } from "../reducers/notification-reducer";
import {useDispatch} from "react-redux"

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		service.login({username, password})
		.then(user => {
			dispatch(setUser(user))
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			dispatch(setLocation("start"))
			dispatch(setNotification("Login successful", 3))
		})
		.catch(e => window.alert("Wrong username or password"))
	}


	return (
		<form onSubmit={handleLogin} className="user-form">
			<h1>Log In</h1>
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
			<button className="login-button">Log In</button>
		</form>
	)
}

export default LoginForm