const BaseRepository = require('./base/baseRepository');
module.exports = class SessionRepository extends BaseRepository {
    constructor({uriDb, dbClient}){
        super('sessions', uriDb, dbClient);
    }
}