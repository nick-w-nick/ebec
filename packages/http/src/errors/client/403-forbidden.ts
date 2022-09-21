import {
    buildOptions,
    buildMessage,
    Options,
    mergeOptions
} from 'ebec';
import { ClientError } from '../base';

export const ForbiddenErrorOptions : Options = {
    code: `FORBIDDEN`,
    statusCode: 403,
    decorateMessage: false,
    logMessage: false
}

export class ForbiddenError extends ClientError {
    constructor(data?: string | Error | Options, options?: Options) {
        options = mergeOptions(
            buildOptions(data, options),
            ForbiddenErrorOptions
        );

        let message = buildMessage(data, options);
        if (!message) {
            message = `Forbidden`;
        }

        super(message, options);
    }
}
