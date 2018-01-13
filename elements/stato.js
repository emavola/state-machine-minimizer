function Stato(id) {
	this.id = id;
	this.archi = [];
	this.archiEntranti = [];
	this.automa = undefined;
	this.merged = undefined;

	this.equalsTo = stato => {
		for (let x; x < this.archi.length; x++) {
			let c = 0;
			for (let y; y < stato.archi.length; y++) {
				if (this.archi[x].equalsTo(stato.archi[y])) {
					c++;
				}
			}
			if (c === 0) {
				return false;
			}
		}
		return true;
	};

	this.output = input => {
		for (let x = 0; x < this.archi.length; x++) {
			if (this.archi[x][input] !== undefined) {
				return [this.archi[x][input], this.archi[x].dest];
			}
		}
	};

	this.isReachable = () => {
		return this.archiEntranti[0] !== undefined;
	};

	this.addArchi = archi => {
		this.archi = this.archi.concat(archi);
	};

	this.mergeAll = stati => {
		stati.forEach(stato => {
			stato.archiEntranti.forEach(x => {
				x.dest = this;
			});
			this.archiEntranti = stato.archiEntranti.concat(this.archiEntranti);
			this.automa.delState(stato);
		});
	};
}

module.exports = Stato;
