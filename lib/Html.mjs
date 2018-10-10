function createElement(type, attribs, empty = true, content = '') {
	if (attribs) {
		let names = Object.getOwnPropertyNames(attribs)
		let joinedAttribs = names.map(name => attribs[name] !== null ? ` ${name}="${attribs[name]}"` : '').join('')
		return `<${type}${joinedAttribs}${empty ? ' />' : `>${content}</${type}>`}`
	} else {
		return `<${type}${empty ? ' />' : `>${content}</${type}>`}`
	}
}

export { createElement as Element }