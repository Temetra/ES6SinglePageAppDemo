import { ViewTemplate, lineBreakFilter } from "./ViewTemplate.mjs"
import { View } from "./View.mjs"

// Add Error to module scope
var Error = (typeof error === 'undefined') ? window.Error : Error

// Turn Firefox error stack into a table
function stack(stack) {
	if (stack) {
		let lines = stack.trim().split(/\n/).map(item => {
			let [func,source,line] = item.split(/@(.*):([0-9]+:[0-9]+)/)
			return `<div><span>${func}</span><span>${source}</span><span>${line}</span></div>`
		})
		return `<div class="head"><span>Function</span><span>File</span><span>Line</span></div>
			${lines.join('\n')}`
	}
	return ''
}

// Error template
var errorTemplate = (error) => `
<h1>Error</h1>
<p>${error.message}</p>
<div class="tab">${stack(error.stack)}</div>
`

class ViewError extends View {
	constructor() {
		super(new ViewTemplate(errorTemplate, lineBreakFilter))
	}
}

export { Error as default, ViewError }
