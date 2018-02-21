const fs = require('fs');
const Automa = require('../elements/automa.js');
const Stato = require('../elements/stato.js');
const Arco = require('../elements/arco.js');

const parse = json => {
	const data = fs.readFileSync(json, 'utf8');
	const obj = JSON.parse(data);
	const stati = [];
	Object.keys(obj).forEach(stato => {
		if (stato !== 'startStateId') {
			stati.push(new Stato(stato));
		}
	});
	const automa = new Automa(obj.startStateId, stati, Object.keys(obj[Object.keys(obj)[0]]));
	automa.states.forEach(st => {
		const archi = [];
		automa.inputs.forEach(inp => {
			archi.push(new Arco(inp, obj[st.id][inp][1], automa.byId(obj[st.id][inp][0])));
		});
		st.addArchi(archi);
	});
	return automa;
};

module.exports = {
	parse
};
