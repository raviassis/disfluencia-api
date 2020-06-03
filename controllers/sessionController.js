const constants = require('../constants');
const Session = require('../models/session');
module.exports = class SessionController {
  constructor({ sessionRepository }) {
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
    } else {
      resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
    }
  }

  async edit(req, resp, next) {
    const session = await this.sessionRepository.findById(req.body._id);
    if (!session) {
      return resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
    }
    const newSession = new Session(req.body);
    session.name = newSession.name;
    session.speechSample = newSession.speechSample;
    session.annotation = newSession.annotation;
    session.transcription = newSession.transcription;
    const result = await this.sessionRepository.updateOne(session);
    if (result) {
      return resp.status(constants.HTTP_STATUS_CODES.CREATED).json(result);
    }
  }
  async delete(req, resp, next) {
    const session = await this.sessionRepository.deleteOne(req.body._id);
    if (!session) {
      return resp.sendStatus(constants.HTTP_STATUS_CODES.NOT_FOUD);
    }
    return resp.status(constants.HTTP_STATUS_CODES.DELETED).json(session);
  }
};
