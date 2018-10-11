/**
 * Template rendering class
 * @param templateFunction Template literal function used to render the template
 * @param otherArgs Any number of content filter functions
 */
class ViewTemplate {

	constructor(templateFunction, ...otherArgs) {
		this.templateFunction = templateFunction
		this.contentFilters = []
		
		for (let i in otherArgs) {
			let arg = otherArgs[i]
			this.contentFilters.push(arg)
		}
	}

	/**
	 * Renders the template into a string using the provided view model
	 * @param model View model used as a source of data for the template
	 */
	render(model) {
		// Start promise by rendering template
		let chain = new Promise(resolve => resolve(this.templateFunction(model)))

		// Process rendered template contents
		for (let i in this.contentFilters) {
			chain = chain.then(this.contentFilters[i])
		}

		// Return promise
		return chain
	}

}

/**
 * Content filter function, strips the extra linebreaks made by nicely formatting template code
 * @param content Content rendered by template
 */
function lineBreakFilter(content) {
	return content.replace(/\n\s*\n/g, '\n')
}

/**
 * Content filter function, dumps the current content to console
 * @param content Content rendered by template
 */
function consoleFilter(content) {
	console.log(content)
	return content
}

export { ViewTemplate, lineBreakFilter, consoleFilter }