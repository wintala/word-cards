
import axios from "axios"
const baseUrl = 'https://afternoon-sands-94176.herokuapp.com/api/'

const getVocabs = () => {
  return axios.get(baseUrl + "vocabs/").then(response => response.data)
}

const getOneVocab = (id) => {
  return axios.get(baseUrl + `vocabs/${id}`).then(response => response.data)
}

const postVocab = (vocab) => {
	axios.post(baseUrl + "vocabs/", vocab)
}

const deleteVocab = (id) => {
	axios.delete(baseUrl + `vocabs/${id}`)
}

export default {getVocabs, getOneVocab, postVocab, deleteVocab}
