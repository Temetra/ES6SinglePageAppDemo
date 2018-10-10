var useCache = false

function cachedFetch(url, options = null) {
	if (useCache) {
		// Look for data in cache
		let cached = sessionStorage.getItem(url)

		// If cached, use this data
		if (cached !== null) {

			// Make a fake response
			let response = new Response(new Blob([cached]))

			// Return promise
			return Promise.resolve(response)
		}
	} else {
		// Create options if not present
		options = options || {}
		
		// Add headers to options if not present
		if (options.hasOwnProperty('headers') === false) options.headers = new Headers()

		// Set cache headers
		options.headers.append('pragma', 'no-cache')
		options.headers.append('cache-control', 'no-cache')
	}

	// Otherwise fetch and cache
	return fetch(url, options).then(response => {

		// Only cache successful hits
		if (useCache === true && response.status === 200) {

			// Clone response to avoid consuming it
			let clonedResponse = response.clone()

			// Get response data as text, and store in cache
			clonedResponse.text().then(content => sessionStorage.setItem(url, content))
		}

		// Return response
		return response
	})
}

export { cachedFetch }