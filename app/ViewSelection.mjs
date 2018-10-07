import { PageFragment } from "../lib/PageFragment.mjs"
import { View } from "../lib/View.mjs"

// Page view
var decisionFragment = new PageFragment(model => `

	<h2>Hello ${model.name}</h2>
	<p>Pick something from the list:</p>
	<div>${nestedFragment.render(model.options)}</div>

`)

var nestedFragment = new PageFragment(options => `

	${options.map(option => `
		<input type="button" data-item="${option.id}" value="${option.value}" title="${option.title}"></input>
	`).join('')}

`)

// What happens when a button is pressed
function buttonEvent(event, application) {
	application.selectItem(event.target.dataset.item)
	event.preventDefault()
}

// View object to maintain application reference for events
// Events use an arrow function closure to pass application to callback
var ViewSelection = class extends View {
	constructor(application) {
		let eventMappings = [
			{ 
				target: "input[type='button']", 
				type: 'click', 
				listener: (event) => { buttonEvent(event, application) } 
			}
		]

		super(decisionFragment, eventMappings)
	}
}

export { ViewSelection }
