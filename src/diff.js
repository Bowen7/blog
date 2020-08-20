const hash = require('hash-sum')
const path = require('path')
const { PostModel } = require('./model')
const { getFileContent, getPostsFromLocal } = require('./utils')

const README_TEMPLATE_PATH = path.resolve(__dirname, './templates/readme.html')
const ISSUE_TEMPLATE_PATH = path.resolve(__dirname, './templates/issue.html')

async function getOldHash() {
	const projection = {
		index: 1,
		hash: 1,
		title: 1,
		_id: 0,
	}
	const readme = await PostModel.findOne({ type: 2 }, projection).exec()
	const issue = await PostModel.findOne({ type: 3 }, projection).exec()
	const posts = await PostModel.find({ type: 1 }, projection).exec()
	return {
		readme: readme.hash,
		issue: issue.hash,
		posts,
	}
}

function getNewHash() {
	const readme = getFileContent(README_TEMPLATE_PATH)
	const issue = getFileContent(ISSUE_TEMPLATE_PATH)
	const posts = []
	const postsMap = getPostsFromLocal()
	for (let index in postsMap) {
		const { hash, title } = postsMap[index]
		posts.push({
			index,
			hash,
			title,
		})
	}
	return {
		readme: hash(readme),
		issue: hash(issue),
		posts,
	}
}

async function diff() {
	const oldHash = await getOldHash()
	const newHash = getNewHash()
	const { posts: oldPosts, readme: oldReadme, issue: oldIssue } = oldHash
	const { posts: newPosts, readme: newReadme, issue: newIssue } = newHash
	const addList = []
	const issueUpdateList = []
	const dbUpdateList = []

	let issueTemplateChanged = oldIssue !== newIssue

	let readmeHash = oldReadme.hash !== newReadme.hash ? newHash : ''
	let issueHash = oldIssue !== newIssue ? newIssue : ''

	newPosts.forEach(newPost => {
		const { index, hash, title } = newPost
		let shouldIssueUpdate = false
		const oldPost = oldPosts.find(oldPost => {
			return oldPost.index === index
		})
		// if create a new post
		// should add issue&db, and update readme
		if (!oldPost) {
			addList.push(index)
			readmeHash = newReadme.hash
			return
		}

		// if issue template change, should update all issue
		if (issueTemplateChanged) {
			issueUpdateList.push(index)
			shouldIssueUpdate = true
		}
		// if a post's title change, should update readme, update issue&db
		if (title !== oldPost.title) {
			readmeHash = newReadme.hash
			!shouldIssueUpdate && issueUpdateList.push(index)
			dbUpdateList.push(index)
			return
		}
		// if a post's content change, should update issue&db
		if (oldPost.hash !== hash) {
			!shouldIssueUpdate && issueUpdateList.push(index)
			dbUpdateList.push(index)
		}
	})

	return {
		readmeHash,
		issueHash,
		addList,
		issueUpdateList,
		dbUpdateList,
	}
}
module.exports = diff
