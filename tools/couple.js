function Couple(stateMachine, state1, state2) {
	this.state1 = state1;
	this.state2 = state2;
	this.stateMachine = stateMachine;

	this.sameOutput = () => {
		for (let x = 0; x < this.stateMachine.inputs.length; x++) {
			if (this.state1.output(this.stateMachine.inputs[x])[0] !== this.state2.output(this.stateMachine.inputs[x])[0]) {
				return false;
			}
		}
		return true;
	};

	this.merge = () => {
		this.state1.merge(this.state2);
	};

	this.extract = () => {
		return [this.state1, this.state2];
	};

	this.equalsTo = couple => {
		if ((couple.extract()[0] === this.extract()[0] && couple.extract()[1] === this.extract()[1]) ||
				(couple.extract()[0] === this.extract()[1] && couple.extract()[1] === this.extract()[0])) {
			return true;
		}
		return false;
	};

	this.equalStates = () => {
		return this.state1.equalsTo(this.state2);
	};

	this.couplesOutStates = () => {
		const lst = [];
		stateMachine.inputs.forEach(input => {
			lst.push(new Couple(stateMachine, this.state1.output(input)[1], this.state2.output(input)[1]));
		});
		return lst;
	};

	this.isInArr = arr => {
		for (let x = 0; x < arr.length; x++) {
			if (this.equalsTo(arr[x])) {
				return true;
			}
		}
		return false;
	};

	this.union = set => {
		if (set.has(this.state1) || set.has(this.state2)) {
			set.add(state1);
			set.add(state2);
			return false;
		}
		return true;
	};
}

module.exports = Couple;
