const { Octokit } = require('@octokit/core')
const ejs = require('ejs')
const process = require('process')
const fs = require('fs')
const path = require('path')

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
})

const POST_TEMPLATE = fs
	.readFileSync(path.resolve(__dirname, './templates/post.html'))
	.toString()
async function add({ title, content, id }) {
	const postContent = ejs.render(POST_TEMPLATE, {
		id,
		content: content,
	})
	const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
		owner: 'Bowen7',
		repo: 'Blog',
		title: title,
		body: postContent,
	})
	return response.data.number
}
async function update({ number, title, content }) {
	await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
		owner: 'Bowen7',
		repo: 'Blog',
		issue_number: number,
		title: title,
		body: content,
	})
}
module.exports = {
	add,
	update,
}
