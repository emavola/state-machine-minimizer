# state-machine-minimizer
>A tool to minimize State Machines for Node.js

## Install

```
$ npm install --save state-machine-minimizer
```

## Usage

```js
const smMinimizer = require('state-machine-minimizer');

const obj = {
	q0: {
		a: ['q5', 1],
		b: ['q1', 1]
	},
	q1: {
		a: ['q0', 0],
		b: ['q3', 1]
	},
	q2: {
		a: ['q5', 0],
		b: ['q1', 1]
	}
};

const objMinimized = smMinimizer.fromObj(obj);

```

## API

### .fromObj(obj, returnType)

#### obj

Type: `object`

#### returnType

Type: `string`<br>
Default: `'str'`

The possible options are:

* 'str' return a stringify object;
* 'obj' return an object;
* 'smg' return a state-machine-graph class.

### .fromPath(path, returnType)

#### path

Type: `string`

The json path

### .fromSMG(smg)

#### smg

Type: `smg class`

Minimize the smg object
