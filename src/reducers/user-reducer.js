const reducer = (state = null, action) => {
	switch(action.type) {
    case "LOGIN":
			return action.data
		case "LOGOUT":
			return null
    default:
        return state
  }
}

export const setUser = (user) => {
	return {type: "LOGIN", data: user}
}

export const removeUser = () => {
	return {type: "LOGOUT"}
}

export default reducer