import { cachedFetch } from "./CachedFetch.mjs"

var overrideLanguage = null
var disableFetchCache = false

var L10N = class {
	// Returns the currently overridden language
	static get overrideLanguage() {
		return overrideLanguage
	}

	// Sets the app language to the given value
	static set overrideLanguage(value) {
		overrideLanguage = value
	}

	// Resets the language override
	static clearOverrideLanguage() {
		overrideLanguage = null
	}

	// Get either the browser or overridden language
	static getLanguage() {
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

	// Loads localisation json and passes it to a given function
	static async localise(func) {
		// Get language for app
		let lang = L10N.getLanguage()

		// Optionally disable fetch cache
		var headers = new Headers()
		if (disableFetchCache) {
			headers.append('pragma', 'no-cache')
			headers.append('cache-control', 'no-cache')
		}

		// Get localisation json
		await cachedFetch(`res/localisation.${lang}.json`, { method: 'GET', headers: headers })
			.then(response => response.json())
			.then(json => func(json))
			.catch(() => {})
	}

	// For each array item, calls func
	// passing the item and a function to obtain the localisation of a text value
	static async localiseList(list, func) {
		await L10N.localise(json => {
			// Returns the localisation of text, or text if none found
			var localiseText = (text) => { return json.hasOwnProperty(text) ? json[text] : text }

			// Iterate over each array item
			for (let i = 0; i < list.length; i++) {
				func(list[i], localiseText)
			}
		})
	}

	// Used in View render promise chain to localise rendered content before adding to DOM
	static async localiseView(renderedContent) {
		// Find content to localise
		let elems = renderedContent.match(/\<localise\>.*\<\/localise\>/gi)

		// Process elements if some found
		if (elems !== null) {
			// Localise using json resource
			await L10N.localise(json => {
				// Process each found element
				for (let i in elems) {
					// Get text from element (<localise>(content)</localise>)
					let text = elems[i].substring(10, elems[i].length - 11)

					// Find entry in json
					text = json.hasOwnProperty(text) ? json[text] : text

					// Replace content
					renderedContent = renderedContent.replace(elems[i], text)
				}
			})
		}

		// Finished
		return renderedContent
	}
}

// Wraps text with a <localise> element
function L(text) {
	return `<localise>${text}</localise>`
}

export { L10N, L }