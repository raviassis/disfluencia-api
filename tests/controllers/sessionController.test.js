const SessionController = require('../../controllers/sessionController');
const constants = require('../../constants');
const Session = require('../../models/session');
const User = require('../../models/user');
const { when } =  require('jest-when');

describe('SessionController', () => {
    let json;
    let status;
    let sendStatus;
    let sessionRepository;
    let userRepository;
    let controller;
    let params;
    
    beforeEach(() => {
        sessionRepository = {
            insertOne: jest.fn(),
            findMany: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
        };
        userRepository = {
            findById: jest.fn(),
        };
        json = jest.fn();
        status = jest.fn().mockReturnValue({json});
        sendStatus = jest.fn();
        params = {};
        controller = new SessionController({sessionRepository, userRepository});
    });

    it('Should not authorize create session and response http code status 401', async () => {
        const idUser = 'idUser';
        const user = new User({
            _id: idUser,
            email: 'email@email.com',
            name: 'name'
        });
        const body = {
            _idUser: idUser,
            name: 'nameSession'
        };
        await controller.create({body}, {status, sendStatus}, {});
        expect(userRepository.findById).toHaveBeenCalledWith(idUser);
        expect(sessionRepository.insertOne).not.toHaveBeenCalled();
        expect(sendStatus).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.UNAUTHORIZED);
        expect(status).not.toHaveBeenCalled();
        expect(json).not.toHaveBeenCalled();
    });

    it('Should create a session and response http code status 201', async () => {
        const id = 'id';
        const idUser = 'idUser';
        const body = {
            _idUser: idUser,
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

        const user = new User({
            _id: idUser,
            email: 'email@email.com',
            name: 'name'
        });

        when(userRepository.findById).calledWith(idUser).mockReturnValue(user);
        sessionRepository.insertOne.mockImplementation((obj) => { obj._id = id; return obj; });

        const resultExpect = new Session({
            _id: id,
            _idUser: idUser,
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
        expect(userRepository.findById).toHaveBeenCalledWith(idUser);
    });

    it('Should return all sessions of user', async () => {
        const _idUser = 'id';
        const resultExpect = [
            new Session({
                _id: '1',
                _idUser,
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
                _idUser,
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
        const query = {_idUser};

        when(sessionRepository.findMany).calledWith({_idUser}).mockReturnValue(resultExpect);

        await controller.get({query}, {status}, {});
        expect(sessionRepository.findMany).toHaveBeenCalledWith({_idUser});
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