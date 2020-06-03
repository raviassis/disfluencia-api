const BaseRepository = require('./base/baseRepository');
const User = require('../models/user');
module.exports = class UserRepository extends BaseRepository {
    constructor({uriDb, dbClient}){
        super('user', uriDb, dbClient);
    }

    _mapResultToModel(result) {
        return result ? new User(result) : null;
    }
}