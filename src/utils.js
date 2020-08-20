const mongoose = require('mongoose')
const hash = require('hash-sum')
const core = require('@actions/core')
const process = require('process')
const fs = require('fs')
const path = require('path')
const POSTS_ROOT_PATH = path.resolve(__dirname, '../posts')
let posts = null
async function initMongo() {
	try {
		await mongoose.connect(process.env.MONGO_PATH, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
	} catch (error) {
		core.setFailed(`Init mongo failed.Action failed with error ${error}`)
	}
}

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

function getPostsFromLocal() {
	if (posts) {
		return posts
	}
	const postFiles = fs.readdirSync(POSTS_ROOT_PATH)
	postFiles.forEach(postFile => {
		const filePath = path.join(POSTS_ROOT_PATH, postFile)
		const index = +postFile.split('.')[0]
		const title = getTitle(postFile)
		const content = getFileContent(filePath)
		posts[index] = {
			index,
			title,
			content,
			hash: hash(content),
			updateTime: Date.now(),
		}
	})
	return posts
}
/**
 *
 * @param {number} index
 * @return {object} {index, title, hash, content}
 */
function getPostByIndexFromLocal(index) {
	getPostsFromLocal()
	return posts[index]
}

async function asyncForEach(arr, fn) {
	for (let i = 0; i < arr.length; i++) {
		await fn(arr[i], i, arr)
	}
}

module.exports = {
	initMongo,
	getFileContent,
	getTitle,
	getPostsFromLocal,
	getPostByIndexFromLocal,
	asyncForEach,
}
