// Page fragment rendering class
var PageFragment = class {

	// Takes a function with one parameter (the view model)
	// and any number of content filter functions
	constructor(templateFunction, ...otherArgs) {
		this.template = templateFunction
		this.contentFilters = []
		
		for (let i in otherArgs) {
			let arg = otherArgs[i]
			this.contentFilters.push(arg)
		}
	}

	// Renders the fragment into a string using the provided view model
	render(model) {
		// Start promise by rendering template
		let chain = new Promise(resolve => resolve(this.template(model)))

		// Process rendered template contents
		for (let i in this.contentFilters) {
			chain = chain.then(renderedContent => this.contentFilters[i](renderedContent))
		}

		// Return promise
		return chain
	}

}

// Content filter, strips the extra linebreaks made by nicely formatting template code
function lineBreakFilter(renderedContent) {
	return renderedContent.replace(/\n\s*\n/g, '\n')
}

// Content filter, dumps the current content to console
function consoleFilter(content) {
	console.log(content)
	return content
}

export { PageFragment, lineBreakFilter, consoleFilter }