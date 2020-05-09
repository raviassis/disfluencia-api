const SessionController = require('../../controllers/sessionController');
const constants = require('../../constants');
const Session = require('../../models/session');

describe('SessionController', () => {
    it('Should create a session and response http code status 201', async () => {
        const json = jest.fn();
        const status = jest.fn().mockReturnValue({json});
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
        const sessionRepository = {
            insertOne: jest.fn().mockImplementation((obj) => { obj._id = id; return obj; }),
        };

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
        const controller = new SessionController({sessionRepository});

        await controller.create({body}, {status}, {});
        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.CREATED);
        expect(json).toHaveBeenCalledWith(resultExpect);
    });
});