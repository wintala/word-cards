import React from "react"

const Info = () => {
	return(
		<>
		<div id="main-info">
			Upload csv file containing the vocabulary you want to study or chooce an existing vocabulary and the app creates two-sided cards for each word-translation pair.
		</div>
		<table id="tips-table">
			<tbody>
				<tr>
					<th>Tips:</th>
				</tr>
				<tr>
					<td>Click the card to flip it</td>
				</tr>
				<tr>
					<td>Pinn the difficult cards. You are offered a change to revisit the pinned cards when you reach the final card</td>
				</tr>	
				<tr>
					<td>Add hints to difficult cards</td>
				</tr>	
			</tbody>
		</table>
		<div id="note">
			Note that anyone can upload vocabulary and view it locally or browse other peoples vocabularies but only logged in users can save and make changes to their vocabularies.
			<br></br>
			Also note that hints and pinnments are stored locally and are only accessible in your current session
		</div>
		</>
	)
}

export default Info