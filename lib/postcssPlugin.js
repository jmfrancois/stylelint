'use strict';

const _ = require('lodash');
const createStylelint = require('./createStylelint');
const path = require('path');
//'block-no-empty': bool || Array

function plugin(options = {}) {
	const tailoredOptions = options.rules ? { config: options } : options;
	const stylelint = createStylelint(tailoredOptions);

	return {
		postcssPlugin: 'stylelint',
		Once: (root, { result }) => {
			let filePath = options.from || _.get(root, 'source.input.file');

			if (filePath !== undefined && !path.isAbsolute(filePath)) {
				filePath = path.join(process.cwd(), filePath);
			}

			return stylelint._lintSource({
				filePath,
				existingPostcssResult: result,
			});
		},
	};
}

plugin.postcss = true;

module.exports = plugin;
