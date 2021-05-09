const commander = require('commander');
const fs = require('fs');
const path = require('path');
const program = new commander.Command();

const parseIntArg = (value) => {
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		throw new commander.InvalidOptionArgumentError('Not a number.');
	}
	return parsedValue;
}

const checkAction = (action) => {
	const actions = ['encode', 'decode'];
	if (actions.indexOf(action) === -1) {
		throw new commander.InvalidOptionArgumentError('Invalid action.');
	}
	return action;
}

const checkFile = (filename) => {
	try {
		filename = path.resolve(filename);
		fs.accessSync(filename, fs.constants.R_OK | fs.constants.W_OK);
		return filename;
	} catch(err) {
		throw new commander.InvalidOptionArgumentError(err);
	}
}

program
	.requiredOption('-a, --action <action>', 'an action encode/decode', checkAction)
	.requiredOption('-s, --shift <number>', 'a shift', parseIntArg)
	.option('-i, --input <filename>', 'an input file', checkFile)
	.option('-o, --output <filename>', 'an output file', checkFile);

program.parse(process.argv);
module.exports = program.opts();