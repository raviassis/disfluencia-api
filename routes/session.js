var express = require('express');
var router = express.Router();
const validator = require('../middlewares/validator');
const CreateSessionValidator = require('../controllers/validators/createSessionValidator');
const UpdateSessionValidator = require('../controllers/validators/updateSessionValidator');
const di = require('../di');

const sessionController = di.resolve('sessionController');

/* GET users listing. */
router.get('/', sessionController.get.bind(sessionController))
        .post('/', validator.validate(CreateSessionValidator), sessionController.create.bind(sessionController))
        .get('/:id', sessionController.getById.bind(sessionController))
        .put('/', validator.validate(UpdateSessionValidator), sessionController.edit.bind(sessionController));

module.exports = router;
