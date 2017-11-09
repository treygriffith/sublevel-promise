import sublevel from 'level-sublevel';

class SublevelPromise {
	constructor(sublevel) {
		this.__sublevel = sublevel;

		for(var key in sublevel) {
			if(this[key] === undefined) {
				this[key] = sublevel[key];
			}
		}
	}

	put(key, value, opts) {
		return this.__promisify('put', key, value, opts);
	}

	get(key, opts) {
		return this.__promisify('get', key, opts);
	}

	del(key, opts) {
		return this.__promisify('del', key, opts);
	}

	batch(ops, opts) {
		return this.__promisify('batch', ops, opts);
	}

	close() {
		return this.__promisify('close');
	}

	__promisify(name, ...args) {
		let sublevel = this.__sublevel;
		return new Promise(function (resolve, reject) {
			sublevel[name](...args, function (err, ...ret) {
				if(err) return reject(err);
				resolve(...ret);
			});
		});
	}

	sublevel() {
		return new SublevelPromise(this.__sublevel.sublevel(...arguments));
	}
}

export default function () {
	return new SublevelPromise(sublevel(...arguments))
}