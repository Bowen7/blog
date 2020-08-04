const marked = require('marked')

let flag = false
function render(str) {
	if (!flag) {
		flag = true
		marked.setOptions({
			renderer: new marked.Renderer(),
			highlight: function (code, language) {
				const hljs = require('highlight.js')
				const validLanguage = hljs.getLanguage(language)
					? language
					: 'plaintext'
				return hljs.highlight(validLanguage, code).value
			},
			pedantic: false,
			gfm: true,
			breaks: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: false,
		})
	}
	return marked(str)
}

module.exports = {
	render,
}
