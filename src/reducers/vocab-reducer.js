const reducer = (state = null, action) => {
	switch(action.type) {
    case "INITIALIZE":
			return action.data
		case "PIN":
			const index = action.data
			const newPairs = [...state.pairs]
			newPairs[index].pinned = !newPairs[index].pinned
			return {...state, pairs: newPairs}
		case "ADD_HINT":
				const i = action.data.index
				const pairs = [...state.pairs]
				pairs[i].hint = action.data.hint
				return {...state, pairs: pairs}
		case "NEW_PAIR":
				return {...state, pairs: state.pairs.concat(action.data)}
		case "DELETE_PAIR":
				return {...state, pairs: state.pairs.filter(p => p.id !== action.data)}
		case "DELETE":
				return null
    default:
        return state
  }
}

export const setWords = (wordList) => {
	return {type: "INITIALIZE", data: wordList}
}

export const pinWord = (index) => {
	return {type: "PIN", data: index}
}

export const setHint = (index, hint) => {
	return {type: "ADD_HINT", data: {index, hint}}
}

export const newWord = (word, translation) => {
	const pair = {pair: [word, translation], pinned: false, hint: ""}
	return {type: "NEW_PAIR", data: pair}
}

export const deleteVocab = () => {
	return {type: "DELETE"}
}

export const deleteWord = (id) => {
	return {type: "DELETE_PAIR", data: id}
}

export default reducer