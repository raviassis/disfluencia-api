const UpdateSessionValidator = require('../../../controllers/validators/updateSessionValidator');
describe('UpdateSessionValidator', () => {
    it('Should inform session name', () => {
        body = {_id: '000000017b704e99b09e1fed'};
        const result = new UpdateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Session name not be empty', () => {
        const body = {name: '', _id: '000000017b704e99b09e1fed'};
        const result = new UpdateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
    });

    it('Should inform session id', () => {
        const body = {name: 'name'};
        const result = new UpdateSessionValidator(body).validate();
        expect(result.valid).toBeFalsy();
        expect(result.errors).toStrictEqual([ { message: '"_id" is required', path: [ '_id' ] } ]);
    });

    it('Should be valid', () => {
        const body = {name: 'name', _id: '000000017b704e99b09e1fed'};
        const result = new UpdateSessionValidator(body).validate();
        expect(result.valid).toBeTruthy();
    });
});