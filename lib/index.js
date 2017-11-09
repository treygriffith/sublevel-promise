'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
	return new SublevelPromise(_levelSublevel2.default.apply(undefined, arguments));
};

var _levelSublevel = require('level-sublevel');

var _levelSublevel2 = _interopRequireDefault(_levelSublevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SublevelPromise = function () {
	function SublevelPromise(sublevel) {
		_classCallCheck(this, SublevelPromise);

		this.__sublevel = sublevel;

		for (var key in sublevel) {
			if (this[key] === undefined) {
				this[key] = sublevel[key];
			}
		}
	}

	_createClass(SublevelPromise, [{
		key: 'put',
		value: function put(key, value, opts) {
			return this.__promisify('put', key, value, opts);
		}
	}, {
		key: 'get',
		value: function get(key, opts) {
			return this.__promisify('get', key, opts);
		}
	}, {
		key: 'del',
		value: function del(key, opts) {
			return this.__promisify('del', key, opts);
		}
	}, {
		key: 'batch',
		value: function batch(ops, opts) {
			return this.__promisify('batch', ops, opts);
		}
	}, {
		key: 'close',
		value: function close() {
			return this.__promisify('close');
		}
	}, {
		key: '__promisify',
		value: function __promisify(name) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			var sublevel = this.__sublevel;
			return new Promise(function (resolve, reject) {
				sublevel[name].apply(sublevel, args.concat([function (err) {
					if (err) return reject(err);

					for (var _len2 = arguments.length, ret = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						ret[_key2 - 1] = arguments[_key2];
					}

					resolve.apply(undefined, ret);
				}]));
			});
		}
	}, {
		key: 'sublevel',
		value: function sublevel() {
			var _sublevel;

			return new SublevelPromise((_sublevel = this.__sublevel).sublevel.apply(_sublevel, arguments));
		}
	}]);

	return SublevelPromise;
}();