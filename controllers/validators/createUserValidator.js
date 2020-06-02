const { attributes } = require('structure');

module.exports = attributes({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})(class CreateUserValidator {})