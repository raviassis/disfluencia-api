const SessionController = require('../../controllers/sessionController');
const constants = require('../../constants');
const Session = require('../../models/session');
const { when } =  require('jest-when');

describe('SessionController', () => {
    let json;
    let status;
    let sendStatus;
    let sessionRepository;
    let controller;
    let params;
    
    beforeEach(() => {
        sessionRepository = {
            insertOne: jest.fn(),
            findMany: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
        };
        json = jest.fn();
        status = jest.fn().mockReturnValue({json});
        sendStatus = jest.fn();
        params = {};
        controller = new SessionController({sessionRepository});
    });

    it('Should create a session and response http code status 201', async () => {
        const id = 'id';
        const body = {
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        };
        sessionRepository.insertOne.mockImplementation((obj) => { obj._id = id; return obj; });

        const resultExpect = new Session({
            _id: id,
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        });        

        await controller.create({body}, {status}, {});
        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.CREATED);
        expect(json).toHaveBeenCalledWith(resultExpect);
    });

    it('Should return all sessions', async () => {
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
        sessionRepository.findMany.mockReturnValue(resultExpect);

        await controller.get({}, {status}, {});
        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.OK);
        expect(json).toHaveBeenCalledWith(resultExpect);
    }); 

    it('Should return specific session', async () => {
        const id = 1;
        const resultExpect = new Session({
            _id: id,
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        }); 

        params = { id };

        const returnDb = new Session({
            _id: id,
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        }); 
        when(sessionRepository.findById).calledWith(id).mockReturnValue(returnDb);

        await controller.getById({params}, {status, sendStatus}, {});

        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.OK);
        expect(json).toHaveBeenCalledWith(resultExpect);
        expect(sendStatus).not.toHaveBeenCalled();
    });

    it('Should return not found', async () => {
        params = { id: 1 };

        await controller.getById({params}, {status, sendStatus}, {});

        expect(sendStatus).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.NOT_FOUD);
        expect(status).not.toHaveBeenCalled();
        expect(json).not.toHaveBeenCalled();
    });

    it('Should edit a session', async () => {
        const body = {
            _id: 'id',
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        };
        const resultExpect = new Session({
            _id: 'id',
            name: 'nameSession',
            speechSample: 'Session text',
            annotation: 'example annotation',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        });

        const returnRepository = new Session({
            _id: 'id',
            name: 'nameSession old',
            speechSample: 'Session text old',
            annotation: 'example annotation old',
            transcription: {
                intelligentSegment: 1,
                therapistInterruption: 1,
                hesitation: 1,
                respite: 1,
                block: 1,
                extension: 1,
                wordIntrusion: 1
            }
        });

        when(sessionRepository.findById).calledWith(body._id).mockReturnValue(returnRepository);
        
        when(sessionRepository.updateOne).calledWith(resultExpect).mockReturnValue(resultExpect);

        await controller.edit({body}, {status}, {});

        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.CREATED);
        expect(json).toHaveBeenCalledWith(resultExpect);
    });

    it('Should can\'t edit inexistent session', async () => {
        const body = {
            _id: 'inexistent id'
        };

        when(sessionRepository.findById).calledWith(body._id).mockReturnValue(null);
        await controller.edit({body}, {status, sendStatus}, {});
        expect(sendStatus).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.NOT_FOUD);
        expect(status).not.toHaveBeenCalled();
        expect(json).not.toHaveBeenCalled();
    });
});