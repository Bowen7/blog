const hash = require("hash-sum");
const path = require("path");
const fs = require("fs");

const README_TEMPLATE_PATH = path.resolve(__dirname, "./templates/readme.html");
const POSTS_ROOT_PATH = path.resolve(__dirname, "../posts");
const OLD_HASH_PATH = path.resolve(__dirname, "./hash.json");

function getFileContent(filePath) {
	try {
		return fs.readFileSync(filePath).toString();
	} catch (error) {
		return "";
	}
}

function generateHashObject() {
	const repoReadmeHash = hash(getFileContent(README_TEMPLATE_PATH));

	const files = fs.readdirSync(POSTS_ROOT_PATH);
	const postsHash = {};
	files.forEach((file) => {
		const filePath = path.join(POSTS_ROOT_PATH, file);
		const index = file.split(".")[0];
		const content = getFileContent(filePath);
		// use post number as key
		postsHash[index] = { title: file, content, hash: hash(content) };
	});
	return {
		repo_readme: repoReadmeHash,
		posts: postsHash,
	};
}

function compareHash() {
	const oldHashObj = JSON.parse(fs.readFileSync(OLD_HASH_PATH).toString());
	const newHashObj = generateHashObject();
	const result = {
		updateReadme: false,
		add: [],
		update: [],
	};
	if (oldHashObj.repo_readme !== newHashObj.repo_readme) {
		result.updateReadme = true;
	}
	const oldPosts = oldHashObj.posts;
	const newPosts = newHashObj.posts;
	for (let key in newPosts) {
		const newPost = newPosts[key];
		const oldPost = oldPosts[key];
		const item = {
			id: key,
			title: newPost.title,
			content: newPost.content,
		};
		delete newPost.content;
		if (!oldPost) {
			result.updateReadme = true;
			result.add.push(item);
			continue;
		}
		newPost.number = oldPost.number;
		item.number = oldPost.number;
		if (oldPost.title !== newPost.title) {
			result.updateReadme = true;
			result.update.push(item);
			continue;
		}
		if (oldPost.hash !== newPost.hash) {
			result.update.push(item);
		}
	}
	function patch({ id, number }) {
		newPosts[id].number = number;
	}
	function next() {
		fs.writeFileSync(OLD_HASH_PATH, JSON.stringify(newHashObj));
	}
	return { result, patch, next };
}
module.exports = compareHash;
