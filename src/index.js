const mongoose = require('mongoose')
const core = require('@actions/core')
const ejs = require('ejs')

const path = require('path')
const fs = require('fs')

const diff = require('./diff')
const { initMongo, asyncForEach, getPostByIndexFromLocal } = require('./utils')
const issue = require('./issue')
const { PostModel } = require('./model')
const md = require('./md')

const README_TEMPLATE_PATH = path.resolve(__dirname, './templates/readme.html')

async function main() {
	await initMongo()
	core.info('Init mongo success')
	const {
		readmeHash,
		issueHash,
		addList,
		issueUpdateList,
		dbUpdateList,
	} = await diff()
	core.info(`
diff success.The diff result is:
	readmeHash: ${readmeHash},
	issueHash: ${issueHash},
	addList: ${addList},
	issueUpdateList: ${issueUpdateList},
	dbUpdateList: ${dbUpdateList}
`)
	await asyncForEach(addList, async index => {
		const item = getPostByIndexFromLocal(index)
		const number = await issue.add({ ...item })
		const post = new PostModel({
			...item,
			number,
			type: 1,
			content: md.render(item.content),
		})
		await post.save()
	})
	core.info('add issue&db success')
	await asyncForEach(issueUpdateList, async index => {
		const item = getPostByIndexFromLocal(index)
		await issue.update({ ...item })
	})
	core.info('update issue success')
	await asyncForEach(dbUpdateList, async index => {
		const item = getPostByIndexFromLocal(index)
		await PostModel.updateOne({ index }, { ...item })
	})
	core.info('update db success')

	if (readmeHash) {
		const posts = await PostModel.find(
			{ type: 1 },
			{ title: 1, number: 1, _id: -1 },
			{
				sort: {
					index: -1,
				},
			}
		).exec()
		const readmeTemplate = fs.readFileSync(README_TEMPLATE_PATH).toString()
		const readme = ejs.render(readmeTemplate, { posts })
		fs.writeFileSync(path.resolve(__dirname, '../README.md'), readme)

		await PostModel.updateOne(
			{
				type: 2,
			},
			{ hash: readmeHash }
		)
		core.info('update readme success')
	}

	if (issueHash) {
		await PostModel.updateOne(
			{
				type: 3,
			},
			{ hash: issueHash }
		)
		core.info('update db issue success')
	}

	await mongoose.disconnect()
	core.info('close mongo connection')
}
main()
