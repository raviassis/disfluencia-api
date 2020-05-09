const constants = require('../constants');
const Session = require('../models/session');
module.exports =  class SessionController {

    constructor({sessionRepository}){
        this.sessionRepository = sessionRepository;
    }

    async create(req, resp, next) {
        const result = await this.sessionRepository.insertOne(new Session(req.body));
        resp.status(constants.HTTP_STATUS_CODES.CREATED).json(result);
    }

    async get(req, resp, next) {
        throw Error("Not implemented yet!");
        const result = await this.sessionRepository.findOne({name: 'teste'});
        resp.status(constants.HTTP_STATUS_CODES.OK).json(result);
    }
}