// Base class for views
var View = class {
	constructor(rootFragment, eventMappings = null) {
		this.rootFragment = rootFragment
		this.eventMappings = eventMappings
	}

	// Renders the fragment to the page
	async display(targetSelector, viewModel) {
		// Find the target element
		var target = document.querySelector(targetSelector)

		// Render template literal using model
		await this.rootFragment.render(viewModel)
			.then(renderedContent => {
				// Update DOM using rendered content
				target.innerHTML = renderedContent
			})
			.then(() => {
				// Bind events to the elements found in target element
				if (this.eventMappings) {
					for (let i in this.eventMappings) {
						let event = this.eventMappings[i]
						let elems = target.querySelectorAll(event.target)
						elems.forEach(elem => elem.addEventListener(event.type, event.listener))
					}
				}
			})

	}
}

export { View }