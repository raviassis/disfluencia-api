var express = require('express');
var router = express.Router();

const validator = require('../middlewares/validator');
const CreateUserValidator = require('../controllers/validators/createUserValidator');
const di = require('../di');

const userController = di.resolve('userController');

/* GET users listing. */
router.get('/', userController.get.bind(userController))
        .post('/', validator.validate(CreateUserValidator), userController.create.bind(userController))
        .get('/:id', userController.getById.bind(userController))
        .put('/', userController.edit.bind(userController));

module.exports = router;
