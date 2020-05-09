const { attributes } = require('structure');

module.exports = attributes({
    name: {
        type: String,
        required: true,
    }
})(class CreateSessionValidator {})