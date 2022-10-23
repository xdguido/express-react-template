class ErrorCode {
    // status 400-499

    static Unauthenticated = 'Unauthenticated';

    static UnverifiedAccount = 'UnverifiedAccount';

    static InvalidCredentials = 'InvalidCredentials';

    static InvalidEmail = 'InvalidEmail';

    static RequestLimit = 'RequestLimit';

    static NotFound = 'NotFound';

    // status 500-599

    static AsyncError = 'AsyncError';

    static UnknownError = 'UnknownError';
}

module.exports = ErrorCode;
