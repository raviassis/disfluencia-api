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
        const sessions = await this.sessionRepository.findMany();
        resp.status(constants.HTTP_STATUS_CODES.OK).json(sessions);
    }

    async getById(req, resp, next) {
        const id = req.params.id;
        const resultExpect = await this.sessionRepository.findById(id);
        if (resultExpect) {
            resp.status(constants.HTTP_STATUS_CODES.OK).json(resultExpect);
        }
        else {
            resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
        }        
    }
}