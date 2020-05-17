const BaseRepository = require('./base/baseRepository');
const Session = require('../models/session');
module.exports = class SessionRepository extends BaseRepository {
    constructor({uriDb, dbClient}){
        super('sessions', uriDb, dbClient);
    }

    _mapResultToModel(result) {
        return result ? new Session(result) : null;
    }
}