const CreateSessionValidator = require('../../../controllers/validators/createSessionValidator');
describe('CreateSessionValidator', () => {
    it('Should inform session name', () => {
        body = {};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Session name not be empty', () => {
        body = {name: ''};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });
});