import { PageFragment } from "./PageFragment.mjs"
import { Localisation } from "./Localisation.mjs"

// Collection of localised fragments with automatically selected rendering
var LocalisedPageFragment = class {
	
	// Takes a function with one parameter (the view model)
	// This is used as the default localisation
	constructor(defaultFragment) {
		this.localisedFragments = {}
		this.localisedFragments[Localisation.defaultLanguage] = new PageFragment(defaultFragment)
	}

	// Adds a page fragment for a specific language
	addLocalisation(lang, fragment) {
		this.localisedFragments[lang] = new PageFragment(fragment)
	}

	// Renders a localised fragment
	render(model) {
		let language = Localisation.currentLanguage
		if (this.localisedFragments.hasOwnProperty(language) === false) language = Localisation.defaultLanguage
		let fragment = this.localisedFragments[language]
		return fragment.render(model)
	}
}

export { LocalisedPageFragment }