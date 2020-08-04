async function asyncForEach(arr, fn) {
	for (let i = 0; i < arr.length; i++) {
		await fn(arr[i], i, arr)
	}
}
module.exports = {
	asyncForEach,
}
