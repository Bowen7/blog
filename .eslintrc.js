module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	parser: "babel-eslint",
	extends: ["eslint:recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2018,
	},
	rules: {
		"no-console": 0,
	},
};
