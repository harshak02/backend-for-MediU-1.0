//import validator from schema-validator';
let Validator = require('validatorjs');

const registerSchema = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
			required: true,
			minLength: 3,
			maxLength: 20,
		},
		mobile: {
			type: 'string',
			required: true,
			minLength: 10,
			maxLength: 10,
		},
		email: {
			type: 'string',
			required: true,
			format: 'email',
		},
		age: {
			type: 'number',
			required: true,
			minimum: 0,
			maximum: 100,
		},
		gender: {
			required: true,
			type: 'string',
		},
	},
};

module.exports = registerSchema;