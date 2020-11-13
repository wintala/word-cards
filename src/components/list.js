import React from "react"
import { useSelector } from "react-redux"

const List = () => {
  const wordPairs = useSelector(state => state)

  return(
    <table className="word-table">
      <tbody>
        {wordPairs.map(p => 
        <tr key={p.pair[0]}>
          <td>
            {p.pair[0]}
          </td>
          <td>
            {p.pair[1]}
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default List