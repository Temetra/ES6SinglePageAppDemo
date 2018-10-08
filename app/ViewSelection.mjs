import { PageFragment } from "../lib/PageFragment.mjs"
import { View } from "../lib/View.mjs"

function L(text) {
	return fetch('../res/localisation.fr.json')
		.then(response => response.json())
		.then(json => json.hasOwnProperty(text) ? json[text] : text)
}

// Page view
var decisionFragment = new PageFragment(async model => `
	<h2>${await L`Hello`} ${model.name}</h2>
	<p>${await L`Pick something from the list`}:</p>
	<div>${await nestedFragment.render(model.options)}</div>
`)

var nestedFragment = new PageFragment(async options => `

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
