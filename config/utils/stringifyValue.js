'use-strict';

module.exports = (hash = {}) =>
	Object.keys(hash).reduce((acc, key) => {
		acc[key] = JSON.stringify(hash[key]);
		return acc;
	}, {});
