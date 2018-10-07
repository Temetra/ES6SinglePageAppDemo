var overrideLanguage = null
var resourceIdentifiers = {}
var resourceStrings = {}

// Returns either the browser language, or the overridden language set by the app
function getLanguage() {
	// Return override if set
	if (overrideLanguage !== null) return overrideLanguage

	// Set language to default
	let selectedLang = ''

	// Get browser language
	if (typeof window !== 'undefined' && window.navigator) {
		// Get primary language
		selectedLang = window.navigator.language.split('-')[0]
	}

	// Done
	return selectedLang
}

// Finds a defined localisation for the given text, or returns the text
function lookupLocalisation(text) {
	// Get current language
	let lang = getLanguage()

	// Find string id
	let id = resourceIdentifiers.hasOwnProperty(text) ? resourceIdentifiers[text] : null

	// Check string exists
	if (id === null) {
		console.debug(`No localisation ID for '${text}'`)
		return text
	}

	// Check localisation resource exists	
	if (resourceStrings.hasOwnProperty(lang) === false) {
		console.debug(`No localisation resource for '${lang}'`)
		return text
	}

	// Get resource strings for current language
	let resource = resourceStrings[lang]

	// Check localisation has string
	if (resource.hasOwnProperty(id) === false) {
		console.debug(`No '${lang}' localisation for '${text}'`)
		return text
	}

	// Return localisation
	return resource[id]
}

var Localisation = {
	get currentLanguage() {
		return getLanguage()
	},

	get overrideLanguage() {
		return overrideLanguage
	},

	set overrideLanguage(lang) {
		overrideLanguage = lang
	},

	// Resource identifers in the form of
	// { 'text': id, ... }
	setResourceIdentifiers(strings) {
		resourceIdentifiers = strings
	},

	// Language resource strings in the form of
	// { id: 'text', ... }
	setResourceStrings(lang, strings) {
		resourceStrings[lang] = strings
	},

	// Looks up a localisation for the given text
	lookupLocalisation: lookupLocalisation
}

// L is used as a shortcut for tag template literals
export { Localisation, lookupLocalisation as L }