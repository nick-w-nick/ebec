// eslint-disable-next-line max-classes-per-file
import {
    HTTPError, InternalServerError, NotFoundError, isClientError, isHTTPError, isServerError,
} from '../../src';

describe('src/module.ts', () => {
    it('should create instance with message', () => {
        const message = 'foo';
        const error = new HTTPError(message);

        expect(error.message).toEqual(message);
    });

    it('should create instance with options', () => {
        const error = new HTTPError({
            statusCode: 490,
            statusMessage: 'Foo bar',
        });
        expect(error.statusCode).toEqual(490);
        expect(error.statusMessage).toEqual('Foo bar');
    });

    it('should recognize client error', () => {
        const error = new NotFoundError();
        expect(isClientError(error)).toBeTruthy();
        expect(isServerError(error)).toBeFalsy();
        expect(isHTTPError(error)).toBeTruthy();
    });

    it('should recognize server error', () => {
        const error = new InternalServerError();
        expect(isClientError(error)).toBeFalsy();
        expect(isServerError(error)).toBeTruthy();
        expect(isHTTPError(error)).toBeTruthy();
    });

    it('should recognize http error', () => {
        const error = new HTTPError({
            statusCode: 300,
        });
        expect(isClientError(error)).toBeFalsy();
        expect(isServerError(error)).toBeFalsy();
        expect(isHTTPError(error)).toBeTruthy();

        const t2 = new Error();
        (t2 as Record<string, any>).statusCode = 500;
        expect(isClientError(t2)).toBeFalsy();
        expect(isServerError(t2)).toBeTruthy();
        expect(isHTTPError(t2)).toBeTruthy();
    });
});
