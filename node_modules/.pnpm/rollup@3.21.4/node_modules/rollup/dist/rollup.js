/*
  @license
	Rollup.js v3.21.4
	Wed, 03 May 2023 18:48:02 GMT - commit 61acfa4c71724f1c1acc62fbf77a7a07e0355fe3

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const rollup = require('./shared/rollup.js');
const watchProxy = require('./shared/watch-proxy.js');
require('node:process');
require('tty');
require('node:path');
require('path');
require('node:perf_hooks');
require('node:crypto');
require('node:fs/promises');
require('node:events');
require('./shared/fsevents-importer.js');



exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watchProxy.watch;
//# sourceMappingURL=rollup.js.map
