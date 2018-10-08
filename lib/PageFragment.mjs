// Page fragment rendering class
var PageFragment = class {

	// Takes a function with one parameter (the view model)
	constructor(templateFunction = null) {
		this.template = templateFunction
	}

	// Renders the fragment into a string using the provided view model
	render(model) {
		let result = this.template(model)
		return result.replace(/\n\s*\n/g, '\n')
	}

}

export { PageFragment }