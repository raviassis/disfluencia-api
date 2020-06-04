const Transcription = require('./transcription');
module.exports = class Session {
    constructor({_id, _idUser, name, speechSample, annotation, transcription}){
        this._id = _id;
        this._idUser = _idUser;
        this.name = name;
        this.speechSample = speechSample;
        this.annotation = annotation;
        this.transcription = transcription ? new Transcription(transcription): transcription;
    }
}
