// Base class for views
var View = class {
	constructor(rootFragment, eventMappings = null) {
		this.rootFragment = rootFragment
		this.eventMappings = eventMappings
	}

	// Renders the fragment to the page
	display(targetSelector, viewModel) {
		// Find the target element
		var target = document.querySelector(targetSelector)

		// Set content of element to rendered fragment output
		target.innerHTML = this.rootFragment.render(viewModel)

		// Bind events to the elements found in target element
		if (this.eventMappings) {
			for (let i in this.eventMappings) {
				let event = this.eventMappings[i]
				let elems = target.querySelectorAll(event.target)
				/*jshint loopfunc: true */
				elems.forEach(elem => elem.addEventListener(event.type, event.listener))
			}
		}
	}
}

export { View }