var overrideLanguage = null
var disableFetchCache = false

var L10N = {
	get overrideLanguage() {
		return overrideLanguage
	},

	set overrideLanguage(value) {
		overrideLanguage = value
	},

	clearOverrideLanguage() {
		overrideLanguage = null
	},

	getLanguage() {
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
}

var localisationFilter = async (renderedContent) => {
	// Find content to localise
	let elems = renderedContent.match(/\<localise\>.*\<\/localise\>/gi)

	// Return if no elements found
	if (elems === null) return renderedContent

	// Get language for app
	let lang = L10N.getLanguage()

	// Optionally disable fetch cache
	var headers = new Headers()
	if (disableFetchCache) {
		headers.append('pragma', 'no-cache')
		headers.append('cache-control', 'no-cache')
	}

	// Get localisation json
	await fetch(`../res/localisation.${lang}.json`, { method: 'GET', headers: headers })
		.then(response => response.json())
		.then(json => {
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

	// Finished
	return renderedContent
}

function L(text) {
	return `<localise>${text}</localise>`
}

export { L10N, localisationFilter, L }