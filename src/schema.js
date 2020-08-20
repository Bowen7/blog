const { Schema } = require('mongoose')
const PostSchema = new Schema({
	title: { type: String },
	content: { type: String },
	update_time: { type: Number },
	index: { type: Number },
	number: { type: Number },
	hash: {
		type: String,
	},
	// 1 post
	// 2 readme template
	// 3 issue template
	type: {
		type: Number,
	},
})
module.exports = {
	PostSchema,
}
