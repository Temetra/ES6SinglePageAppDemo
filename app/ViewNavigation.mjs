import { LocalisedPageFragment } from "../lib/LocalisedPageFragment.mjs"
import { View } from "../lib/View.mjs"

// Page view
var fragment = new LocalisedPageFragment(stage => `

	<span class="${highlight(1, stage)}">Choose</span> &raquo; 
	<span class="${highlight(2, stage)}">Confirm</span> &raquo; 
	<span class="${highlight(3, stage)}">Finished</span>

`)

fragment.addLocalisation('fr', stage => `

	<span class="${highlight(1, stage)}">Choisir</span> &raquo; 
	<span class="${highlight(2, stage)}">Confirmer</span> &raquo; 
	<span class="${highlight(3, stage)}">Fini</span>

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
