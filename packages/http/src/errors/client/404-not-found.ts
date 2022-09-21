import {
    buildOptions,
    buildMessage,
    Options,
    setUnsetOptions
} from 'ebec';
import { ClientError } from '../base';

export const NotFoundErrorOptions : Options = {
    code: `NOT_FOUND`,
    statusCode: 404,
    decorateMessage: false,
    logMessage: false
}

export class NotFoundError extends ClientError {
    constructor(data?: string | Error | Options, options?: Options) {
        options = setUnsetOptions(
            buildOptions(data, options),
            NotFoundErrorOptions
        );

        let message = buildMessage(data, options);
        if (!message) {
            message = `Not Found`;
        }

        super(message, options);
    }
}
