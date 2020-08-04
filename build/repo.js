const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const str = fs
	.readFileSync(path.resolve(__dirname, "./templates/readme"))
	.toString();
const result = ejs.render(str, {
	posts: [
		{
			title: "1. chuang",
			link: "https://www.baidu.com",
		},
	],
});
console.log(result);
