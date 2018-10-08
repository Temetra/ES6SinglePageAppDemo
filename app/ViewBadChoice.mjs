import { PageFragment } from "../lib/PageFragment.mjs"
import { EventMapping, View } from "../lib/View.mjs"

// Page view
var selectedFragment = new PageFragment(model => `

	<h2>Wait... ${model.picked.title.toLowerCase()}?</h2>
	<p>Why on earth are you buying ${model.picked.title.toLowerCase()}?</p>
	<div class="image">${model.picked.value}</div>
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
		let returnMap = new EventMapping("#return", 'click', (event) => { returnEvent(event, application) })
		super(selectedFragment, returnMap)
	}
}

export { ViewBadChoice }
