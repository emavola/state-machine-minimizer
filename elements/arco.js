function Arco(input, output, dest) {
	this[input] = output;
	this.dest = dest;
	this.dest.archiEntranti.push(this);

	this.equalsTo = arco => {
		if (this.input === arco.input && this.dest.id === arco.dest.id) {
			return true;
		}
		return false;
	};
}

module.exports = Arco;
