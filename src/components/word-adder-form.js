import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {newWord} from "../reducers/vocab-reducer"
import service from '../service'

const WordAdderForm = () => {
	const [word, setWord] = useState("")
	const [translation, setTranslation] = useState("")
	const wordPairs = useSelector(s => s.words)
	const user = useSelector(s => s.user)
	const dispatch = useDispatch()

	const handeleWordAdd = (e) => {
		e.preventDefault()
		const postData = {word, translation, vocabulary: wordPairs.id}
		service.addWord(postData, user).then(r => {
			dispatch(newWord(r.word, r.translation))
		})
		setTranslation("")
		setWord("")
	}

	return(
		<form onSubmit={handeleWordAdd} className="user-form">
			<h1>Add word</h1>
			<div className="input-container">
				<input
					type="text"
					required
					value={word}
					onChange={({ target }) => setWord(target.value)}
				/>
				<label>Word</label>
			</div>
			<div className="input-container">
				<input
					type="text"
					required
					value={translation}
					onChange={({ target }) => setTranslation(target.value)}
				/>
				<label>Translation</label>
			</div>
			<button className="login-button" >Add</button>
		</form>
	)
}


export default WordAdderForm