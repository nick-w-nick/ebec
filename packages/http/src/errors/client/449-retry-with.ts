import {
    buildOptions,
    buildMessage,
    Options,
    mergeOptions
} from 'ebec';
import { ClientError } from '../base';

export const RetryWithErrorOptions : Options = {
    code: `RETRY_WITH`,
    statusCode: 449,
    decorateMessage: false,
    logMessage: false
}

export class RetryWithError extends ClientError {
    constructor(data?: string | Error | Options, options?: Options) {
        options = mergeOptions(
            buildOptions(data, options),
            RetryWithErrorOptions
        );

        let message = buildMessage(data, options);
        if (!message) {
            message = `Retry With`;
        }

        super(message, options);
    }
}
