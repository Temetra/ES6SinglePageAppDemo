var EventMapping = class {
	constructor(target, type, listener) {
		this.target = target
		this.type = type,
		this.listener = listener
	}
}

// Base class for views
var View = class {

	// Set the root fragment, and any number of EventMappings
	constructor(rootFragment, ...otherArgs) {
		this.rootFragment = rootFragment
		this.eventMappings = []

		for (let i in otherArgs) {
			let arg = otherArgs[i]
			if (arg instanceof EventMapping) {
				this.eventMappings.push(arg)
			}
		}
	}

	// Renders the fragment to the page
	display(targetSelector, viewModel) {
		// Find the target element
		var target = document.querySelector(targetSelector)

		// Render template literal using model
		let chain = this.rootFragment.render(viewModel)
		
		// Update DOM using rendered content
		chain = chain.then(renderedContent => { target.innerHTML = renderedContent })

		// Bind events to the elements found in target element
		return chain.then(() => {
			for (let i in this.eventMappings) {
				let event = this.eventMappings[i]
				let elems = target.querySelectorAll(event.target)
				elems.forEach(elem => elem.addEventListener(event.type, event.listener))
			}
		})
	}
}

export { EventMapping, View }