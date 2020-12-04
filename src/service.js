
import axios from "axios"
const baseUrl = 'https://afternoon-sands-94176.herokuapp.com/api/'

const login = async (credidentials) => {
  return axios.post(baseUrl + "login/", credidentials).then(response => response.data)
}

const signup = async (credidentials) => {
  return axios.post(baseUrl + "users/", credidentials).then(response => response.data)
}

const getVocabs = () => {
  return axios.get(baseUrl + "vocabs/").then(response => response.data)
}

const getOneVocab = (id) => {
  return axios.get(baseUrl + `vocabs/${id}`).then(response => response.data)
}

const postVocab = (vocab, user) => {
  const config = {
    headers: { Authorization: `Token ${user.token}`},
	}
	return axios.post(baseUrl + "vocabs/", vocab, config).then(response => response.data)
}

const deleteVocab = (id, user) => {
  const config = {
    headers: { Authorization: `Token ${user.token}`},
	}
	return axios.delete(baseUrl + `vocabs/${id}`, config)
}

const addWord = (pair, user) => {
  const config = {
    headers: { Authorization: `Token ${user.token}`},
	}
  return axios.post(baseUrl + "pairs/", pair, config).then(response => response.data)
}

const deleteWord = (id, user) => {
  const config = {
    headers: { Authorization: `Token ${user.token}`},
	}
  return axios.delete(`${baseUrl}pairs/${id}/`, config)
}


export default {getVocabs, getOneVocab, postVocab, deleteVocab, login, addWord, signup, deleteWord}
