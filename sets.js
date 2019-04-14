import deepEqual from "deep-equal";

/**
 * Returns true if two arrays contain the same contents regardless of order.
 * @param {T[]} a 
 * @param {T[]} b 
 * @returns {boolean}
 */
export function equivalent(a, b) {
	a = dedupe(a);
	b = dedupe(b);

	const x = new Set();
	if (a.length !== b.length) {
		return false;
	}
	for (const n of a) {
		for (let j = 0; j < b.length; ++j) {
			if (x.has(j)) {
				continue;
			}
			if (deepEqual(n, b[j])) {
				x.add(j);
			}
		}
	}
	return x.size === a.length;
}

/**
 * Removes duplicate entries in an array.
 * @param {T[]} arr 
 * @returns {T[]}
 */
export function dedupe(arr) {
	let output = [];
	for (let i = 0; i < arr.length; ++i) {
		let j;
		for (j = i + 1; j < arr.length; ++j) {
			if (deepEqual(arr[i], arr[j])) {
				break;
			}
		}
		if (j === arr.length) {
			output = output.concat(arr[i]);
		}
	}
	return output;
}

/**
 * Returns the intersection of two or more arrays.
 * @param  {...T[]} arg 
 * @returns {T[]}
 */
export function intersection(...arg) {
	if (arg.length === 0) {
		return [];
	}
	const q =  dedupe(arg[0]).filter(e => {
		for (let i = 1; i < arg.length; ++i) {
			let found = false;
			for (const f of arg[i]) {
				if (deepEqual(e, f)) {
					found = true;
					break;
				}
			}
			if (!found) {
				return false;
			}
			return true;
		}
	});
	return q;
}

/**
 * Returns the union of two or more arrays.
 * @param  {...T[]} arg 
 * @returns {T[]}
 */

export function union(...arg) {
	return arg.reduce((a, k) => a.concat(dedupe(k)), []);
}

/**
 * Returns the difference of two arrays.
 * @param {T[]} a 
 * @param {T[]} b 
 * @returns {a: T[], b: T[]}
 */
export function diff(a, b) {
	a = dedupe(a);
	b = dedupe(b);
	const aret = a.filter(elem => {
		for (const c of b) {
			if (deepEqual(elem, c)) {
				return false;
			}
		}
		return true;
	});
	const bret = b.filter(elem => {
		for (const c of a) {
			if (deepEqual(elem, c)) {
				return false;
			}
		}
		return true;
	});

	return {a: aret, b: bret};
}