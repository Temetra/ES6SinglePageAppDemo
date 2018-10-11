import { ViewTemplate } from "./ViewTemplate.mjs"
import { L10N } from "../lib/L10N.mjs"

/**
 * Collection of localised ViewTemplates
 * @param defaultTemplate Default template literal function used to render the template
 */
class LocalisedViewTemplate {
	
	constructor(defaultTemplate) {
		this.localisedTemplates = {}
		this.localisedTemplates['default'] = new ViewTemplate(defaultTemplate)
	}

	/**
	 * Adds a template for a specific language
	 * @param languageCode ISO 639 code representing the language used by the template
	 * @param templateFunction Template literal function used to render the template
	 */
	addLocalisation(languageCode, templateFunction) {
		this.localisedTemplates[languageCode] = new ViewTemplate(templateFunction)
	}

	/**
	 * Selects a template and renders into a string using the provided view model
	 * @param model View model used as a source of data for the template
	 */
	render(model) {
		let language = L10N.getLanguage()
		if (this.localisedTemplates.hasOwnProperty(language) === false) language = 'default'
		let fragment = this.localisedTemplates[language]
		return fragment.render(model)
	}
}

export { LocalisedViewTemplate }