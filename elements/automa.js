function Automa(startStateId, states, inputs) {
	this.startStateId = startStateId;
	this.states = states;
	this.inputs = inputs;
	states.forEach(st => {
		st.automa = this;
	});

	this.delState = stato => { 										// Poco efficente, riscrivere
		this.states = this.states.filter(el => {
			if (el.id === stato.id) {
				return false;
			}
			return true;
		});
	};

	this.addState = state => {
		this.states.push(state);
		state.automa = this;
	};

	this.byId = id => {
		for (let x = 0; x < this.states.length; x++) {
			if (id === this.states[x].id) {
				return this.states[x];
			}
		}
	};

	this.delUnreachables = () => {
		if (this.startStateId !== undefined) {
			this.states = this.states.filter(st => {
				return (!st.isReachable()) && (this.startStateId !== st.id);
			});
		}
	};

	this.seqInp = (seq, statoId) => {
		let ret = '';
		let stato = this.byId(statoId);
		seq.split('').forEach(inp => {
			const out = stato.output(inp);
			ret += out[0];
			stato = out[1];
		});
		return ret;
	};

	this.toString = () => {
		const obj = {};
		this.states.forEach(st => {
			const inp = {};
			this.inputs.forEach(input => {
				inp[input] = [st.output(input)[1].id, st.output(input)[0]];
			});
			obj[st.id] = inp;
		});
		return JSON.stringify(obj, '', 4);
	};
}

module.exports = Automa;
