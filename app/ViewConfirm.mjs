import { ViewTemplate } from "../lib/ViewTemplate.mjs"
import { EventMapping, View } from "../lib/View.mjs"

// Page view
var selectedFragment = new ViewTemplate(model => `

	<h2>${model.picked.title}?</h2>
	<div class="image">${model.picked.value}</div>
	<div class="confirm">
		<input type="button" id="return" value="Cancel" title="Cancel and return to selection"></input>
		<input type="button" id="continue" value="Continue" title="Continue"></input>
	</div>

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
		let returnMap = new EventMapping('#return', 'click', (event) => { returnEvent(event, application) })
		let continueMap = new EventMapping('#continue', 'click', (event) => { continueEvent(event, application) })
		super(selectedFragment, returnMap, continueMap)
	}
}

export { ViewConfirm }
