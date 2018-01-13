/**
 * Definisce una coppia di stati
 */
function Couple(automa, stato1, stato2) {
	this.stato1 = stato1;
	this.stato2 = stato2;
	this.automa = automa;

	this.sameOutput = () => {
		for (let x = 0; x < this.automa.inputs.length; x++) {
			if (this.stato1.output(this.automa.inputs[x])[0] !== this.stato2.output(this.automa.inputs[x])[0]) {
				return false;
			}
		}
		return true;
	};

	this.merge = () => {
		this.stato1.merge(this.stato2);
	};

	this.extract = () => {
		return [this.stato1, this.stato2];
	};

	this.equalsTo = couple => {
		if ((couple.extract()[0] === this.extract()[0] && couple.extract()[1] === this.extract()[1]) ||
				(couple.extract()[0] === this.extract()[1] && couple.extract()[1] === this.extract()[0])) {
			return true;
		}
		return false;
	};

	this.equalStates = () => {
		return this.stato1.equalsTo(this.stato2);
	};

	this.couplesOutStates = () => {
		const lst = [];
		automa.inputs.forEach(input => {
			lst.push(new Couple(automa, this.stato1.output(input)[1], this.stato2.output(input)[1]));
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
		if (set.has(this.stato1) || set.has(this.stato2)) {
			set.add(stato1);
			set.add(stato2);
			return false;
		}
		return true;
	};
}

module.exports = Couple;
