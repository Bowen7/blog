const OSS = require('ali-oss')
const ejs = require('ejs')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const process = require('process')
const utils = require('./utils')
const md = require('./md')
const HASH_PATH = path.resolve(__dirname, './hash.json')
const DIST_PATH = path.resolve(__dirname, '../dist')
const client = OSS({
	accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
	accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
	bucket: process.env.ALI_OSS_BUCKET,
	region: process.env.ALI_OSS_REGION,
})
const cacheKey = process.env.CACHE_KEY
const CACHE_URL = `https://zhangwenxiang.cn/cache/${cacheKey}`
let hashObj = {}
// update posts.json and readme
async function updatePosts() {
	hashObj = JSON.parse(fs.readFileSync(HASH_PATH).toString())
	const postsObj = hashObj.posts
	const posts = []
	for (let key in postsObj) {
		posts.push({ id: key, ...postsObj[key] })
	}
	posts.sort((a, b) => +b.id - +a.id)
	updateReadme(posts)

	const finalPath = path.join(DIST_PATH, './posts.json')
	fs.writeFileSync(finalPath, JSON.stringify(posts))
	await client.put('dist/posts.json', finalPath)
}

// update single post
async function updatePost({ id, content, title }) {
	content = md.render(content)
	const post = {
		title,
		content,
		update_time: Date.now(),
	}
	const finalPath = path.join(DIST_PATH, `./post_${id}.json`)
	fs.writeFileSync(finalPath, JSON.stringify(post))
	await client.put(`dist/post_${id}.json`, finalPath)
}

// update multiple post
async function forEachUpdatePost(addList, updateList) {
	await utils.asyncForEach(addList, async post => {
		await updatePost(post)
	})
	// if post is already exist, would send a request to tell blog-engine remove cache
	await utils.asyncForEach(updateList, async post => {
		await updatePost(post)
		await axios.get(`${CACHE_URL}/${post.id}`)
	})
}

async function updateReadme(posts) {
	const readmeTemplate = fs
		.readFileSync(path.resolve(__dirname, './templates/readme.html'))
		.toString()
	const readme = ejs.render(readmeTemplate, { posts })
	fs.writeFileSync(path.resolve(__dirname, '../README.md'), readme)
}

module.exports = {
	updatePosts,
	forEachUpdatePost,
}
