const compare = require('./compare')
const issue = require('./issue')
const repo = require('./repo')
const utils = require('./utils')
async function main() {
	const { result, patch, next } = compare()
	const { addList, updateList } = result
	if (updateList.length === 0 && addList.length === 0 && !result.updateReadme) {
		return
	}
	await utils.asyncForEach(updateList, async item => {
		await issue.update(item)
	})
	await utils.asyncForEach(addList, async item => {
		const number = await issue.add(item)
		patch({ id: item.id, number })
	})
	next()
	if (result.updateReadme) {
		await repo.updatePosts()
	}
	await repo.forEachUpdatePost(addList, updateList)
}
main()
