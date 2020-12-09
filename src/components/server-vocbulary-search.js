import React, {useEffect, useState} from 'react';
import service from "../service"
import { useDispatch} from "react-redux"
import { setWords } from "../reducers/vocab-reducer";
import {setLocation} from "../reducers/nav-reducer"


const ServerFileGetter = () => {
	const dispatch = useDispatch()
	const [vocabList, setVocablist] = useState(null)
	const [filter, setFilter] = useState("")

	useEffect(() => {
			service.getVocabs().then(r => setVocablist(r))
		}, [])

	const handleVocabSelection = (id) => {
		// null triggeröi latausanimaation
		dispatch(setWords(null))
		service.getOneVocab(id).then(r =>{
			dispatch(setWords(
				{
					pairs: r.wordpairs.map(x => ({pair: [x.word, x.translation], id: x.id, pinned: false, hint: ""})),
					name: r.name,
					owner: r.owner,
					id: r.id
				}
			))
		}
		)
		dispatch(setLocation("cards"))
	}

	return(
		<div className="instruction">
			<div className="input-container">
				<input
					id="filter"
					type="text"
					required
					value={filter}
					onChange={({ target }) => setFilter(target.value)}
				/>
				<label>Search vocabulary</label>
			</div>
			{vocabList ? 
			<ul>
				{vocabList.filter(v => v.name.toLowerCase().includes(filter.toLowerCase())).map(v => 
				<li onClick={() => handleVocabSelection(v.id)} key={v.name}> 
					<div>{v.name}</div>
				</li>)}
			</ul> : 
			<div className="load-wrap">
				<div className="spin-loading"></div>
			</div>}
		</div>
	)
}

export default ServerFileGetter
