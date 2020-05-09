const validator = require('../../middlewares/validator');
const constants = require('../../constants');
describe('Validator', () => {
    let next;
    const req = {
        body: {},
    };
    let jsonMock;
    let status;
    let res= {
        status,
    };
    let validate;
    let objValidatorMock = function() {
        this.validate = validate;
        return;
    };

    beforeEach(() => {
        validate = () => {};
        status = () => {};
        jsonMock = () => {};
        next = () => {};
    });

    test('is valid', () => {
        validate = jest.fn().mockReturnValue({valid: true});
        next = jest.fn();
        jsonMock = jest.fn();
        res.status = jest.fn().mockReturnValue({json: jsonMock});
        validator.validate(objValidatorMock)(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(jsonMock).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    test('is not valid', () => {
        validate = jest.fn().mockReturnValue({valid: false});
        next = jest.fn();
        jsonMock = jest.fn();
        res.status = jest.fn().mockReturnValue({json: jsonMock});
        validator.validate(objValidatorMock)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
        expect(jsonMock).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});