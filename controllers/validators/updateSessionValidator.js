const { attributes } = require('structure');

module.exports = attributes({
    _id: {
        type: String,
        regex: /^[0-9a-fA-F]{24}$/,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
})(class UpdateSessionValidator {})