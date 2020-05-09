module.exports = class Transcription {
    constructor({intelligentSegment, therapistInterruption, hesitation, respite, block, extension, wordIntrusion}) {
        this.intelligentSegment = intelligentSegment;
        this.therapistInterruption = therapistInterruption;
        this.hesitation = hesitation;
        this.respite = respite;
        this.block = block;
        this.extension = extension;
        this.wordIntrusion = wordIntrusion;
    }

};