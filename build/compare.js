const hash = require('hash-sum')
const path = require('path')
const fs = require('fs')

const README_TEMPLATE_PATH = path.resolve(__dirname, './templates/readme.html')
const POSTS_ROOT_PATH = path.resolve(__dirname, '../posts')
const OLD_HASH_PATH = path.resolve(__dirname, './hash.json')

function getFileContent(filePath) {
	try {
		return fs.readFileSync(filePath).toString()
	} catch (error) {
		return ''
	}
}

function getTitle(filename) {
	const start = filename.indexOf('.')
	const end = filename.lastIndexOf('.')
	return filename.slice(start + 1, end)
}

function generateHashObject() {
	const repoReadmeHash = hash(getFileContent(README_TEMPLATE_PATH))

	const files = fs.readdirSync(POSTS_ROOT_PATH)
	const postsHash = {}
	files.forEach(file => {
		const filePath = path.join(POSTS_ROOT_PATH, file)
		const index = file.split('.')[0]
		const content = getFileContent(filePath)
		const title = getTitle(file)
		// use post number as key
		postsHash[index] = { title, content, hash: hash(content) }
	})
	return {
		repo_readme: repoReadmeHash,
		posts: postsHash,
	}
}

function compare() {
	const oldHashObj = JSON.parse(getFileContent(OLD_HASH_PATH))
	const newHashObj = generateHashObject()
	const result = {
		updateReadme: false,
		addList: [],
		updateList: [],
	}
	if (oldHashObj.repo_readme !== newHashObj.repo_readme) {
		result.updateReadme = true
	}
	const oldPosts = oldHashObj.posts
	const newPosts = newHashObj.posts
	for (let key in newPosts) {
		const newPost = newPosts[key]
		const oldPost = oldPosts[key]
		const item = {
			id: key,
			title: newPost.title,
			content: newPost.content,
		}
		// this post will be included in the posts.json, so need not content
		delete newPost.content

		// add post
		if (!oldPost) {
			result.updateReadme = true
			result.addList.push(item)
			continue
		}
		// update post
		newPost.number = oldPost.number
		item.number = oldPost.number
		// if title change, readme would update
		if (oldPost.title !== newPost.title) {
			result.updateReadme = true
			result.updateList.push(item)
			continue
		}
		if (oldPost.hash !== newPost.hash) {
			result.updateList.push(item)
		}
	}
	// new post should patch id&number
	function patch({ id, number }) {
		newPosts[id].number = number
	}
	function next() {
		fs.writeFileSync(OLD_HASH_PATH, JSON.stringify(newHashObj))
	}
	return { result, patch, next }
}
module.exports = compare
