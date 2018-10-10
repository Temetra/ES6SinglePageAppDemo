import { PageFragment, lineBreakFilter, consoleFilter } from "../lib/PageFragment.mjs"
import { EventMapping, View } from "../lib/View.mjs"
import { L, L10N } from "../lib/L10N.mjs"

// Page view
var body = (model) => `

	<h2>${L`Hello`} ${model.name}</h2>
	<p>${L`Pick something from the list`}:</p>
	<div>${nestedFragment(model.options)}</div>

`

var nestedFragment = (options) => `

	${options.map(option => `
		<input type="button" class="option" data-item="${option.id}" value="${option.value}" title="${option.title}"></input>
	`).join('')}

	`

// What happens when a button is pressed
function buttonEvent(event, application) {
	application.selectItem(event.target.dataset.item)
	event.preventDefault()
}

// View object to maintain application reference for events
// Events use an arrow function closure to pass application to callback
var ViewSelection = class extends View {
	constructor(application) {
		var fragment = new PageFragment(body, L10N.localiseView, lineBreakFilter, consoleFilter)
		let mapButton = new EventMapping("input[type='button']", 'click', (event) => { buttonEvent(event, application) })
		super(fragment, mapButton)
	}
}

export { ViewSelection }
