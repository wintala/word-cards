import React, {useEffect, useState} from 'react';
import service from "../service"
import { useDispatch } from "react-redux"
import { setWords } from "../reducer";


const ServerFileGetter = ({setNavLocation}) => {
	const dispatch = useDispatch()
	const [vocabList, setVocablist] = useState(null)

	useEffect(() => {
			service.getVocabs().then(r => setVocablist(r))
		},[])

	const handleVocabSelection = (id) => {
		service.getOneVocab(id).then(r =>{
			dispatch(setWords(
				r.wordpairs.map(x => ({pair: [x.word, x.translation], pinned: false, hint: ""}))
			))
			setNavLocation("cards")
		}
		)
	}

	const handleVocabDelete = (id) => {
		if (window.confirm("If this isn't your own vocabulary you probably shouldn't do this (maintainer of this site is too lazy to add user athentication). Wish to continue?")) {
			service.deleteVocab(id)
			const vocabsAfterDeltetion = vocabList.filter(v => v.id !== id)
			setVocablist(vocabsAfterDeltetion)
		}

	}

	return(
		<div className="instruction">
			<div>Chooce an existing vocabulary:</div>
			{vocabList ? 
			<ul>
				{vocabList.map(v => 
				<li key={v.name}> 
					<div onClick={() => handleVocabSelection(v.id)}>{v.name}</div>
					<div className="delete-button" onClick={() => handleVocabDelete(v.id)}>X</div>
				</li>)}
			</ul> : 
			<div className="load-wrap">
				<div className="spin-loading"></div>
			</div>}
		</div>
	)
}

export default ServerFileGetter
