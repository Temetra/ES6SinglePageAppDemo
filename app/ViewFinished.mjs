import { PageFragment } from "../lib/PageFragment.mjs"
import { EventMapping, View } from "../lib/View.mjs"

// Page view
var selectedFragment = new PageFragment(model => `

	<h2>Cheers ${model.name}</h2>
	<p>You decided to buy ${model.picked.title.toLowerCase()}. ${Math.random() >= 0.5 ? 'Nice!' : 'Great!'}</p>
	<div><a id="return" href="">Return</a></div>

`)

// What happens when return link is pressed
function returnEvent(event, application) {
	application.showSelection()
	event.preventDefault()
}

// View object
var ViewFinished = class extends View {
	constructor(application) {
		let eventMappings = [new EventMapping("#return", 'click', (event) => { returnEvent(event, application) })]
		super(selectedFragment, eventMappings)
	}
}

export { ViewFinished }
