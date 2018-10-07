import { PageFragment } from "../lib/PageFragment.mjs"
import { View } from "../lib/View.mjs"

// Page view
var selectedFragment = new PageFragment(model => `

	<h2>WTF? ${model.picked.title}?</h2>
	<p>Why on earth are you buying ${model.picked.title.toLowerCase()}?</p>
	<p style="font-size:72pt;">${model.picked.value}</p>
	<div><a id="return" href="">Sorry, take me back to the list</a></div>

`)

// What happens when return link is pressed
function returnEvent(event, application) {
	application.showSelection()
	event.preventDefault()
}

// View object to maintain application reference for events
var ViewBadChoice = class extends View {
	constructor(application) {
		let eventMappings = [
			{ target: '#return', type: 'click', listener: (event) => { returnEvent(event, application) } }
		]

		super(selectedFragment, eventMappings)
	}
}

export { ViewBadChoice }
