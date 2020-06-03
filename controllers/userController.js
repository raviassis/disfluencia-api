const constants = require('../constants');
const User = require('../models/user');
module.exports =  class UserController {

    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async create(req, resp, next) {
        const result = await this.userRepository.insertOne(new User(req.body));
        resp.status(constants.HTTP_STATUS_CODES.CREATED).json(result);
    }

    async get(req, resp, next) {
        const Users = await this.userRepository.findMany();
        resp.status(constants.HTTP_STATUS_CODES.OK).json(Users);
    }

    async getById(req, resp, next) {
        const id = req.params.id;
        const resultExpect = await this.userRepository.findById(id);
        if (resultExpect) {
            resp.status(constants.HTTP_STATUS_CODES.OK).json(resultExpect);
        }
        else {
            resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
        }        
    }

    async edit(req, resp, next) {
        const User = await this.userRepository.findById(req.body._id);
        if (!User) {
            return resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
        }
        const newUser = new User(req.body);
        User.name = newUser.name;
        User.email = newUser.email;
        User.password = newUser.password;
        const result = await this.userRepository.updateOne(User);
        if (result) {
            return resp.status(constants.HTTP_STATUS_CODES.CREATED).json(result);
        }
    }
}