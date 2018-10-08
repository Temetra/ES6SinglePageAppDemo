import { PageFragment } from "../lib/PageFragment.mjs"
import { EventMapping, View } from "../lib/View.mjs"

// Page view
var selectedFragment = new PageFragment(model => `

	<h2>Cheers ${model.name}</h2>
	<p>You decided to buy ${model.picked.title.toLowerCase()}. ${Math.random() >= 0.5 ? 'Nice!' : 'Great!'}</p>
	<div class="finished">
		<input type="button" id="return" value="Return" title="Return to selection"></input>
	</div>

`)

// What happens when return link is pressed
function returnEvent(event, application) {
	application.showSelection()
	event.preventDefault()
}

// View object
var ViewFinished = class extends View {
	constructor(application) {
		let returnMap = new EventMapping("#return", 'click', (event) => { returnEvent(event, application) })
		super(selectedFragment, returnMap)
	}
}

export { ViewFinished }
