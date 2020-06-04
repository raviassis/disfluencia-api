const CreateSessionValidator = require('../../../controllers/validators/createSessionValidator');
describe('CreateSessionValidator', () => {
    it('Should inform session name', () => {
        const body = {_idUser: '000000017b704e99b09e1fed'};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Session name not be empty', () => {
        const body = {name: '', _idUser: '000000017b704e99b09e1fed'};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Should inform _idUser', () => {
        const body = {name: 'Name Session'};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Should inform a valid _idUser', () => {
        const body = {name: 'Name Session', _idUser: 'id'};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('CreateSession should be valid', () => {
        const body = {name: 'Name Session', _idUser: '000000017b704e99b09e1fed'};
        const result = new CreateSessionValidator(body).validate();
        expect(result.valid).toBe(true);
    })
});