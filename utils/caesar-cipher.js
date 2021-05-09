const {Transform} = require('stream');

const ALPHABET_AMOUNT = 26;

const caesarCipher = (str, shift) => {
	shift = shift < 0 ? ALPHABET_AMOUNT + shift % ALPHABET_AMOUNT : shift % ALPHABET_AMOUNT;
	const firstLowerLetterCode = 'a'.charCodeAt(0);
	const firstUpperLetterCode = 'A'.charCodeAt(0);

	return [...str].map((strChar) => {
		if (strChar.match(/[a-z]/i)) {
			const firstLetterCode = strChar.match(/[a-z]/) ? firstLowerLetterCode : firstUpperLetterCode;
			const code = strChar.charCodeAt(0);
			strChar = String.fromCharCode(((code - firstLetterCode + shift) % ALPHABET_AMOUNT) + firstLetterCode);
		}

		return strChar;
	}).join('');
};

const caesarCipherTransform = (shift) => {
	return new Transform({
		transform: (chunk, encoding, done) => {
			const result = caesarCipher(chunk.toString(), shift);
			done(null, result);
		}
	});
};

module.exports = {caesarCipher, caesarCipherTransform};