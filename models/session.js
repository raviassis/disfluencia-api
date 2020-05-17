const Transcription = require('./transcription');
module.exports = class Session {
    constructor({_id, name, speechSample, annotation, transcription}){
        this._id = _id;
        this.name = name;
        this.speechSample = speechSample;
        this.annotation = annotation;
        this.transcription = transcription ? new Transcription(transcription): transcription;
    }
}
