import { ViewNavigation } from "./ViewNavigation.mjs"
import { ViewSelection } from "./ViewSelection.mjs"
import { ViewBadChoice } from "./ViewBadChoice.mjs"
import { ViewConfirm } from "./ViewConfirm.mjs"
import { ViewFinished } from "./ViewFinished.mjs"
import { L10N } from "../lib/L10N.mjs"

// App state, data provided by user etc
var appState = {
	name: 'Friend',
	picked: null
}

// Data related to page. Maybe from a db or service.
var options = null

// Loads data from resource
async function loadData() {
	// Get options from server
	options = await fetch('../res/data.json')
		.then(response => response.json())
		.then(json => json)
	
	// Localise options
	let localiseTitle = (item, localiseText) => { item.title = localiseText(item.title) }
	await L10N.localiseList(options, localiseTitle)
}

// Show visitor item selection
function showSelection() {
	// Set app state
	appState.picked = null

	// Compile view model
	var viewModel = Object.assign({ options: options }, appState)

	// Show content
	navigationView.display('nav', 1)
	selectionView.display('section', viewModel)
}

// Visitor has selected an item
function selectItem(itemId) {
	// Set app state
	// Find item obj by id
	appState.picked = options.find(function(item) {
		return item.id === itemId
	})

	// Show content
	navigationView.display('nav', 2)
	if (appState.picked.badChoice) badChoiceView.display('section', appState)
	else confirmView.display('section', appState)
}

// Visitor has confirmed item selection
function confirmItem() {
	// Show content
	navigationView.display('nav', 3)
	finishedView.display('section', appState)
}

// Composite app object for views
var application = {
	state: appState,
	showSelection: showSelection,
	selectItem: selectItem,
	confirmItem: confirmItem,
	L10N: L10N,
	loadData: loadData
}

// Create views
var navigationView = new ViewNavigation(application)
var selectionView = new ViewSelection(application)
var badChoiceView = new ViewBadChoice(application)
var confirmView = new ViewConfirm(application)
var finishedView = new ViewFinished(application)

// Display when ready
window.addEventListener('load', async event => {
	// Expose app to console for debugging
	window.app = application

	// Load data
	await loadData()

	// Show first stage
	showSelection()
})
