var EventMapping = class {
	constructor(target, type, listener) {
		this.target = target
		this.type = type,
		this.listener = listener
	}
}

// Base class for views
var View = class {

	// Set the root fragment, and any number of EventMappings and content filter functions
	constructor(rootFragment, ...otherArgs) {
		this.rootFragment = rootFragment
		this.eventMappings = []
		this.contentFilters = []

		for (let i in otherArgs) {
			let arg = otherArgs[i]
			if (arg instanceof EventMapping) {
				this.eventMappings.push(arg)
			} else {
				this.contentFilters.push(arg)
			}
		}
	}

	// Renders the fragment to the page
	display(targetSelector, viewModel) {
		// Find the target element
		var target = document.querySelector(targetSelector)

		// Render template literal using model
		let chain = new Promise(resolve => resolve(this.rootFragment.render(viewModel)))

		// Filter content after template is rendered
		// This can be used to replace <localise> tags for example
		for (let i in this.contentFilters) {
			chain = chain.then(renderedContent => this.contentFilters[i](renderedContent))
		}
		
		// Update DOM using rendered content
		chain = chain.then(renderedContent => { target.innerHTML = renderedContent })

		// Bind events to the elements found in target element
		chain.then(() => {
			for (let i in this.eventMappings) {
				let event = this.eventMappings[i]
				let elems = target.querySelectorAll(event.target)
				elems.forEach(elem => elem.addEventListener(event.type, event.listener))
			}
		})
	}
}

export { EventMapping, View }