const smg = require('state-machine-graph');
const Couple = require('./tools/couple.js');

const fromSMG = stateMachine => {
	stateMachine.delUnreachables();
	let cp = prodCart(stateMachine.states).map(el => {
		return new Couple(stateMachine, el[0], el[1]);
	}).filter(x => x.sameOutput());
	let del = true;
	while (del) {
		const toRem = [];
		del = false;
		for (let x = 0; x < cp.length; x++) {
			let isIn = true;
			const outArr = cp[x].couplesOutStates();
			for (let y = 0; y < outArr.length; y++) {
				if (!outArr[y].isInArr(cp) && outArr[y].state1.id !== outArr[y].state2.id) {
					isIn = false;
					break;
				}
			}
			if (!isIn) {
				toRem.push(x);
				del = true;
			}
		}
		cp = cp.filter(couple => {
			if (toRem.includes(cp.indexOf(couple))) {
				return false;
			}
			return true;
		});
	}
	let set;
	let lst;
	while (cp[0] !== undefined) {
		set = new Set(cp[0].extract());
		cp = cp.filter(x => x.union(set));
		lst = Array.from(set).sort().reverse();
		lst.pop().mergeAll(lst);
	}
	stateMachine.delUnreachables();
};

const toType = (stateMachine, returnType) => {
	fromSMG(stateMachine);
	switch (returnType) {
		case 'str':
			return stateMachine.toString();
		case 'obj':
			return stateMachine.toObj();
		case 'smg':
			return stateMachine;
		default:
			throw new Error('ReturnType not allowed');
	}
};

const fromObj = (obj, returnType) => {
	returnType = returnType || 'str';
	const stateMachine = smg.stateMachineBuilder.byObj(obj);
	return toType(stateMachine, returnType);
};

const fromPath = (path, returnType) => {
	returnType = returnType || 'str';
	const stateMachine = smg.stateMachineBuilder.byPath(path);
	return toType(stateMachine, returnType);
};

function prodCart(arr) {
	const lst = [];
	const len = arr.length;
	for (let x = 0; x < len - 1; x++) {
		const current = arr[len - 1 - x];
		for (let y = 0; y < len - 1 - x; y++) {
			lst.push([arr[y], current]);
		}
	}
	return lst;
}

module.exports = {
	fromSMG,
	fromObj,
	fromPath
};
