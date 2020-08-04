const compareHash = require("./hash");
const issue = require("./issue");
async function asyncForEach(arr, fn) {
	for (let i = 0; i < arr.length; i++) {
		await fn(arr[i], i, arr);
	}
}
async function main() {
	const { result, patch, next } = compareHash();
	const { update, add } = result;
	if (update.length === 0 && add.length === 0 && !result.updateReadme) {
		return;
	}
	await asyncForEach(update, async (item) => {
		await issue.update(item);
	});
	await asyncForEach(add, async (item) => {
		const number = await issue.add(item);
		patch({ id: item.id, number });
	});
	next();
}
main();
