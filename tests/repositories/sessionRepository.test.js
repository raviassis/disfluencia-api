const SessionRepository = require('../../repositories/sessionRepository');
const Session = require('../../models/session');
describe('SessionRepository', () => {
    const uriDb = 'url-to-database';
    let toArray;
    let findOne;
    let find;
    let collection;
    let close;
    let db;
    let connect;
    let dbClient;
    let sessionRepository = new SessionRepository({uriDb, dbClient});

    beforeEach(() => {
        toArray = jest.fn();
        find = jest.fn().mockReturnValue({toArray});
        findOne = jest.fn();
        collection = jest.fn().mockReturnValue({find, findOne});
        close = jest.fn();
        db = jest.fn().mockReturnValue({collection});
        connect = jest.fn().mockReturnValue({db, close});
        dbClient = {connect};
        sessionRepository = new SessionRepository({uriDb, dbClient});
    });

    it('Should create correctly', () => {
        const sessionRepository = new SessionRepository({uriDb, dbClient});
        expect(sessionRepository.collection).toBe('sessions');
        expect(sessionRepository.uri).toBe(uriDb);
        expect(sessionRepository.dbClient).toBe(dbClient);
    });

    it('Should find many sessions', async () => {
        const returnDb = [
            {
                _id: '1',
                name: 'session1',
                speechSample: 'speech session 1',
                annotation: 'example annotation 1',
                transcription: {
                    intelligentSegment: 1,
                    therapistInterruption: 1,
                    hesitation: 1,
                    respite: 1,
                    block: 1,
                    extension: 1,
                    wordIntrusion: 1,
                },
            },
            {
                _id: '2',
                name: 'session2',
                speechSample: 'speech session 2',
                annotation: 'example annotation 2',
                transcription: {
                    intelligentSegment: 2,
                    therapistInterruption: 2,
                    hesitation: 2,
                    respite: 2,
                    block: 2,
                    extension: 2,
                    wordIntrusion: 2,
                },
            }
        ];
        const resultExpect = [
            new Session({
                _id: '1',
                name: 'session1',
                speechSample: 'speech session 1',
                annotation: 'example annotation 1',
                transcription: {
                    intelligentSegment: 1,
                    therapistInterruption: 1,
                    hesitation: 1,
                    respite: 1,
                    block: 1,
                    extension: 1,
                    wordIntrusion: 1,
                },
            }),
            new Session({
                _id: '2',
                name: 'session2',
                speechSample: 'speech session 2',
                annotation: 'example annotation 2',
                transcription: {
                    intelligentSegment: 2,
                    therapistInterruption: 2,
                    hesitation: 2,
                    respite: 2,
                    block: 2,
                    extension: 2,
                    wordIntrusion: 2,
                },
            }),
        ];
        
        toArray.mockReturnValue(returnDb);
        
        const result = await sessionRepository.findMany();
        expect(result).toStrictEqual(resultExpect);
    });

    it('Should find session by id', async () => {
        const id = 1;
        const returnDb = {
                _id: id,
                name: 'session1',
                speechSample: 'speech session 1',
                annotation: 'example annotation 1',
                transcription: {
                    intelligentSegment: 1,
                    therapistInterruption: 1,
                    hesitation: 1,
                    respite: 1,
                    block: 1,
                    extension: 1,
                    wordIntrusion: 1,
                },
        };
        const resultExpect = new Session({
                _id: id,
                name: 'session1',
                speechSample: 'speech session 1',
                annotation: 'example annotation 1',
                transcription: {
                    intelligentSegment: 1,
                    therapistInterruption: 1,
                    hesitation: 1,
                    respite: 1,
                    block: 1,
                    extension: 1,
                    wordIntrusion: 1,
                },
        });
        findOne.mockReturnValue(returnDb);

        const result = await sessionRepository.findById(id);
        expect(result).toStrictEqual(resultExpect);
    });

    it('Should not find a session by specific id and should return null', async () => {
        const id = 1;
        findOne.mockReturnValue(null);
        const result = await sessionRepository.findById(id);
        expect(result).toBeFalsy();
    });
});