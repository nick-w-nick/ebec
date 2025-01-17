import { BaseError, isOptions as isBaseOptions } from 'ebec';
import type { Input } from '../../types';
import {
    extractOptions, isOptions, sanitizeStatusCode, sanitizeStatusMessage,
} from '../../utils';

export class HTTPError extends BaseError {
    /**
     * A numeric Status Code between 400-599.
     */
    statusCode: number;

    /**
     * A status message.
     */
    statusMessage?: string;

    /**
     * Specify a redirect URL in case of a http error.
     */
    redirectURL?: string;

    constructor(...input: Input[]) {
        super(...input);

        const options = extractOptions(...input);

        this.statusCode = options.statusCode ?
            sanitizeStatusCode(options.statusCode) :
            500;

        this.statusMessage = options.statusMessage ?
            sanitizeStatusMessage(options.statusMessage) :
            undefined;

        this.redirectURL = options.redirectURL;
    }
}

export function isHTTPError(error: unknown): error is HTTPError {
    if (error instanceof HTTPError) {
        return true;
    }

    if (!isOptions(error) || !error.statusCode || !isBaseOptions(error)) {
        return false;
    }

    const statusCode = sanitizeStatusCode(error.statusCode);

    return statusCode >= 400 &&
        statusCode < 600;
}
