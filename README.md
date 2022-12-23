# splace

[![NPM](https://nodei.co/npm/splace.png)](https://nodei.co/npm/splace/)

[![NPM version](https://img.shields.io/npm/v/splace.svg)](https://www.npmjs.com/package/splace)
[![build](https://github.com/remarkablemark/splace/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/splace/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/splace/branch/master/graph/badge.svg?token=3G1H3T9BPT)](https://codecov.io/gh/remarkablemark/splace)

Split and replace string:

```
splace(string, replace[, excludeEmpty])
```

[Replit](https://replit.com/@remarkablemark/splace)

## Quick Start

```ts
import { splace } from 'splace';

splace('Hello, world!', { world: 'person' }); // ['Hello, ', 'person', '!']
```

## Installation

[NPM](https://www.npmjs.com/package/splace):

```sh
npm install splace
```

[Yarn](https://yarnpkg.com/package/splace):

```sh
yarn add splace
```

## Usage

Import with ES modules:

```ts
import { splace } from 'splace';
```

Require with CommonJS:

```ts
const { splace } = require('splace');
```

Split and replace a word:

```ts
splace('Hello, world!', { world: 'mate' });
// ['Hello, ', 'mate', '!']
```

Split and replace words:

```ts
splace('Hello, world!', { Hello: "G'day", world: 'mate' });
// ["G'day", ', ', 'mate', '!']
```

Split and replace based on object order:

```ts
splace('How much wood would a woodchuck chuck, if a woodchuck could chuck wood?', {
  woodchuck: 'foo',
  wood: 'bar',
  chuck: 'baz',
}).join('');
// 'How much bar would a foo baz, if a foo could baz bar?'
```

Split and replace non-string values:

```ts
splace('1 + 1 = 2', { 1: {}, 2: [] });
// [{}, ' + ', {}, ' = ', []]
```

Empty strings are removed from the output by default. To prevent empty strings from being removed:

```ts
splace('foo', { foo: 'bar' }, false);
// ['', 'bar', '']
```

## Release

Release is automated with [Release Please](https://github.com/googleapis/release-please).

## License

[MIT](https://github.com/remarkablemark/splace/blob/master/LICENSE)
