import React from 'react';
import { readString } from 'react-papaparse'
import { useDispatch, useSelector } from "react-redux"
import { setWords } from "../reducers/vocab-reducer";
import ServerFileGetter from "./server-vocbulary-search"
import service from "../service"
import {setLocation} from "../reducers/nav-reducer"
import { setNotification } from "../reducers/notification-reducer";


const FileForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.user)

  const handleFileUpload = (file) => {
    const reader = new FileReader()

    reader.onload = async (fileData) => { 
      const text = fileData.target.result
      const arr = readString(text)
      const fileName = file.name.substring(0, file.name.length - 4)
      const postData = {
        name: fileName, 
        wordpairs: arr.data.map(x => ({word: x[0], translation: x[1]})).filter(x => x.word && x.translation)
      }
      console.log(postData);
      if (postData.wordpairs.length !== 0) {
        if (user) {
          service.postVocab(postData, user).then(r => {
            dispatch(setWords(
              {
                pairs: r.wordpairs.map(x => ({pair: [x.word, x.translation], id: x.id, pinned: false, hint: ""})),
                name: r.name,
                owner: r.owner,
                id: r.id
              }
            ))
          })
          .catch(err => {
            dispatch(setNotification("Your data could not be the saved to the server due to invalid content of your file", 4))
            const words = arr.data.map(x => ({pair: x, pinned: false, hint: ""}))
            dispatch(setWords({name: fileName, pairs: words, owner: null, id: null, unsaveable: true}))
          })
        }
        else {
          dispatch(setNotification("Your data was not saved because your not logged in", 4))
            const words = arr.data.map(x => ({pair: x, pinned: false, hint: ""}))
            dispatch(setWords({name: fileName, pairs: words, owner: null, id: null}))
        }
        dispatch(setLocation("cards"))
      } 
      else {
        console.log("jii");
        dispatch(setNotification("There appeard not to be any content in your file", 3))
      }
    }

    reader.readAsText(file)
  }

  return (
      <div>
        <div className="header">
          <h1>Welcome to Vocab Training</h1>
        </div>
        <form>
          <input onChange={(e) => handleFileUpload(e.target.files[0])} type="file" id="file" name="uploadFile" accept=".txt, .csv"/>
          <label htmlFor="file">
            <figure><svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 20 17">
                <path
                  d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
                </path>
              </svg></figure>
          </label>
        </form>
        <div className="instruction-wrapper">
          <div className="instruction">
            <div>Upload csv file with following structure:</div>
          <table className="example">
            <tbody>
              <tr>
                <td></td>
                <td>A</td>
                <td>B</td>
              </tr>
              <tr>
                <td>1</td>
                <td>word1</td>
                <td>translation1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>word2</td>
                <td>translation2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>word3</td>
                <td>translation3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="or">OR</div>
          <ServerFileGetter />
        </div>
      </div>
  )
}

export default FileForm