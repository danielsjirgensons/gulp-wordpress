/**
 * Deep merge two objects with array concatenation support.
 * Native JavaScript implementation to eliminate lodash dependency.
 *
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns {*} The merged result
 */
module.exports = function deepMerge(target, source) {
	if (typeof target !== 'object' || target === null) return source;
	if (typeof source !== 'object' || source === null) return target;

	// Handle root-level array concatenation
	if (Array.isArray(target) && Array.isArray(source)) {
		return target.concat(source);
	}

	const result = Array.isArray(target) ? [...target] : { ...target };

	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			if (Array.isArray(source[key]) && Array.isArray(result[key])) {
				result[key] = result[key].concat(source[key]);
			} else if (typeof source[key] === 'object' && source[key] !== null &&
				typeof result[key] === 'object' && result[key] !== null &&
				!Array.isArray(source[key]) && !Array.isArray(result[key])) {
				result[key] = deepMerge(result[key], source[key]);
			} else {
				result[key] = source[key];
			}
		}
	}

	return result;
};
