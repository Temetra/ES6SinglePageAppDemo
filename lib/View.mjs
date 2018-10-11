/**
 * Object to define an event handler mapping
 * @param targetSelector Selector used to locate the target element
 * @param eventType Type of event to listen for
 * @param eventListener Event handler function
 */
class EventMapping {
	constructor(targetSelector, eventType, eventListener) {
		this.target = targetSelector
		this.type = eventType,
		this.listener = eventListener
	}
}

/**
 * View renders a ViewTemplate into a DOM element
 * @param {ViewTemplate} template ViewTemplate to render into the element
 * @param {EventMapping} otherArgs Any number of EventMapping objects
 */
class View {

	constructor(template, ...otherArgs) {
		this.template = template
		this.eventMappings = []

		for (let i in otherArgs) {
			let arg = otherArgs[i]
			if (arg instanceof EventMapping) {
				this.eventMappings.push(arg)
			}
		}
	}

	/**
	 * Renders the template into the target element
	 * @param targetSelector Selector used to locate the target element
	 * @param viewModel Model to pass to the template when rendering
	 */
	display(targetSelector, viewModel) {
		// Find the target element
		var target = document.querySelector(targetSelector)

		// Render template literal using model
		let chain = this.template.render(viewModel)

		// Test for target
		if (target === null) {
			console.log(`${targetSelector} not found when displaying view`)
			return chain
		}
		
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