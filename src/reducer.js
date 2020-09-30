const reducer = (state = [], action) => {
	switch(action.type) {
    case "INITIALIZE":
			return action.data
		case "PIN":
			const index = action.data
			const newPairs = [...state]
			newPairs[index].pinned = !newPairs[index].pinned
			return newPairs
		case "ADD_HINT":
				const i = action.data.index
				const pairs = [...state]
				pairs[i].hint = action.data.hint
				return pairs
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

export default reducer