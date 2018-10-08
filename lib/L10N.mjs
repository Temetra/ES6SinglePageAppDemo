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
	// Get language for app
	let lang = L10N.getLanguage()

	// Find content to localise
	let tags = renderedContent.match(/\<localise\>.*\<\/localise\>/gi)

	// Replace each tag
	for (let i in tags) {
		// Strip tags (<localise>...</localise>)
		let text = tags[i].substring(10, tags[i].length - 11)

		// Optionally disable fetch cache
		var headers = new Headers()
		if (disableFetchCache) {
			headers.append('pragma', 'no-cache')
			headers.append('cache-control', 'no-cache')
		}

		// Get localisation
		text = await fetch(`../res/localisation.${lang}.json`, { method: 'GET', headers: headers })
			.then(response => response.json())
			.then(json => json.hasOwnProperty(text) ? json[text] : text)
			.catch(() => text)

		// Replace content
		renderedContent = renderedContent.replace(tags[i], text)
	}

	// Finished
	return renderedContent
}

function L(text) {
	return `<localise>${text}</localise>`
}

export { L10N, localisationFilter, L }