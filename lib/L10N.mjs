var Localisation = class {
	constructor() {
		this._override = null
	}

	get overrideLanguage() {
		return this._override
	}

	set overrideLanguage(lang) {
		this._override = lang
	}

	clearOverrideLanguage() {
		this._override = null
	}

	getLanguage() {
		// Return override if set
		if (this._override !== null) return this._override

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
}

export { Localisation }