import React from "react"
import { useSelector, useDispatch } from "react-redux"
import WordAdderForm from "./word-adder-form"
import service from "../service"
import { deleteVocab, deleteWord } from "../reducers/vocab-reducer";
import { setLocation } from "../reducers/nav-reducer";
import { setWords } from "../reducers/vocab-reducer";
import { setNotification } from "../reducers/notification-reducer";

const List = () => {
  const vocabulary = useSelector(s => s.words)
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()

  if (!vocabulary) {
    return (
      <div className="load-wrap-main">
        <div className="spin-loading"></div>
      </div>
    )
  }

  const isOwner = user && vocabulary.owner === user.id

  const handleVocabDelete = () => {
    if (window.confirm("Are you sure you want to delete this vocabulary permanently")) {
      dispatch(setWords(null)) // triggeröidään latausanimaatio
      service.deleteVocab(vocabulary.id, user).then(r => {
        dispatch(deleteVocab())
        dispatch(setNotification("Delete successful", 2))
        dispatch(setLocation("start"))
      })
    }
  }

  const hanldeWordDelete = (id) => {
    service.deleteWord(id, user).catch(e => alert("The delete couldn't be made in the server"))
    dispatch(deleteWord(id))
  }

  const handleVocabSave = () => {
    const postData = {
      name: vocabulary.name, 
      wordpairs: vocabulary.pairs.map(x => ({word: x.pair[0], translation: x.pair[1]})).filter(x => x.word && x.translation)
    }
    service.postVocab(postData, user).then(r => {
      dispatch(setWords(
        {
          pairs: r.wordpairs.map(x => ({pair: [x.word, x.translation], id: x.id, pinned: false, hint: ""})),
          name: r.name,
          owner: r.owner,
          id: r.id
        }
      ))
      dispatch(setNotification("Save successful", 2))
    })
    .catch(e => {
      dispatch(setNotification("Unable to save due invalid content", 2))
      dispatch(setWords({...vocabulary, unsaveable: true}))
    })
  }

  return(
    <>
      {isOwner ?
      <WordAdderForm />:
      <div id="table-info">
        {vocabulary.owner && user ? 
        "You are not the owner of this vocabulary so you can't make changes to it" : user ?
        !vocabulary.unsaveable ?
        "Do you want to save this vocabulary to the server?": null :
        "You have to log in to save or make changes to vocabularies"
        }
      </div>
      }
      {(!vocabulary.owner && user && !vocabulary.unsaveable) ? <button className="save-button" onClick={handleVocabSave} >Save</button> : null}
      
      <table className="word-table">
        <tbody>
          {vocabulary.pairs.map((p, i) => 
          <tr key={i}>
            <td>
              {p.pair[0]}
            </td>
            <td>
              {p.pair[1]}
            </td>
            {isOwner ? 
            <td className="x-button-holder">
              <div className="delete-button" onClick={() => hanldeWordDelete(p.id)}>X</div>
            </td> : null}
          </tr>)}
        </tbody>
      </table>
      {isOwner ?
      <button className="vocab-delete-button" onClick={handleVocabDelete}>Delete vocabulary</button> : null}
    </>
  )
}

export default List