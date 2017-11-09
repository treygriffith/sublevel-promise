sublevel-promise
================

[Sublevel](http://npmjs.com/package/level-sublevel) that returns native Promises instead of using a callback pattern.

Intended for use with ES6 `async`/`await`.

### Usage
It is intended to have (mostly) the same API as Sublevel:

```javascript
import level from 'level-browserify';
import sublevel from 'sublevel-promise';

let db = sublevel(level('/tmp/sublevel-example'));
let sub = db.sublevel('stuff');

async function doStuff () {
	// put a key into the main levelup 
	await db.put(key, value);

	// put a key into the sub-section!
	await sub.put(key, value);
}
```

### Limitations

This library currently only implements the following functions with promises:
- `put`
- `get`
- `del`
- `batch`
- `close`

All other methods are copied from [Sublevel](http://npmjs.com/package/level-sublevel).