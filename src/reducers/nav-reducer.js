const reducer = (state = "start", action) => {
	switch (action.type) {
		case "CHANGE_LOCATION":
			return(action.data)
		default:
			return state
	}
}

export const setLocation = (loc) => {
	return {type: "CHANGE_LOCATION", data: loc}
}

export default reducer