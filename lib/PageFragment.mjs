// Page fragment rendering class
var PageFragment = class {

	// Takes a function with one parameter (the view model)
	constructor(templateFunction = null) {
		this.template = templateFunction
	}

	// Renders the fragment into a string using the provided view model
	render(model) {
		// Process template if one exists
		if (this.template) {
			// Execute template using view model
			let result = this.template(model)

			// Replace multiple newlines
			return result.replace(/\n\s*\n/g, '\n')
		}
		
		// Otherwise return empty string
		return ''
	}
}

export { PageFragment }