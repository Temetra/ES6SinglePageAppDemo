import { PageFragment } from "../lib/PageFragment.mjs"
import { EventMapping, View } from "../lib/View.mjs"

// Page view
var selectedFragment = new PageFragment(model => `

	<h2>${model.picked.title}?</h2>
	<p style="font-size:72pt;">${model.picked.value}</p>
	<div><a id="continue" href="">Continue</a></div>
	<div><a id="return" href="">Cancel and return to selection</a></div>

`)

// What happens when return link is pressed
function returnEvent(event, application) {
	application.showSelection()
	event.preventDefault()
}

function continueEvent(event, application) {
	application.confirmItem()
	event.preventDefault()
}

// View object to maintain application reference for events
var ViewConfirm = class extends View {
	constructor(application) {
		let eventMappings = [
			new EventMapping('#return', 'click', (event) => { returnEvent(event, application) }),
			new EventMapping('#continue', 'click', (event) => { continueEvent(event, application) })
		]
		super(selectedFragment, eventMappings)
	}
}

export { ViewConfirm }
