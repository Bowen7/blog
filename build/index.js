const compareHash = require('./hash')
const issue = require('./issue')
const repo = require('./repo')
const utils = require('./utils')
async function main() {
	const { result, patch, next } = compareHash()
	const { update, add } = result
	if (update.length === 0 && add.length === 0 && !result.updateReadme) {
		return
	}
	await utils.asyncForEach(update, async item => {
		await issue.update(item)
	})
	await utils.asyncForEach(add, async item => {
		const number = await issue.add(item)
		patch({ id: item.id, number })
	})
	next()
	if (result.updateReadme) {
		await repo.updatePosts()
	}
	await repo.updatePostList([...add, ...update])
}
main()
