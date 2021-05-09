const arguments = require('./utils/arguments');
const fs = require('fs');
const {caesarCipherTransform} = require('./utils/caesar-cipher');
const {pipeline} = require('stream');

const shift = arguments.action === 'decode' ? (-1) * arguments.shift : arguments.shift;
const readStream = arguments.input ? fs.createReadStream(arguments.input) : process.stdin;
const writeStream = arguments.output ? fs.createWriteStream(arguments.output, {flags:'a'}) : process.stdout;

pipeline(
	readStream,
	caesarCipherTransform(shift),
	writeStream,
	(error) => {
		if (error) {
			console.error(error);
		}
	}
);