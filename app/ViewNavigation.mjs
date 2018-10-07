import { PageFragment } from "../lib/PageFragment.mjs"
import { View } from "../lib/View.mjs"

// Page view
var fragment = new PageFragment(stage => `

	<span class="${highlight(1, stage)}">Choose</span> &raquo; 
	<span class="${highlight(2, stage)}">Confirm</span> &raquo; 
	<span class="${highlight(3, stage)}">Finished</span>

`)

function highlight(linkStage, modelStage) {
	return (linkStage === modelStage) ? 'highlight' : ''
}

// View object to maintain application reference for events
var ViewNavigation = class extends View {
	constructor(application) {
		super(fragment)
	}
}

export { ViewNavigation }
