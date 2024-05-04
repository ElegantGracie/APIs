class CustomError extends Error {
    status;
    message;
    fieldsError;

    constructor(status, message, fieldsError) {
        super(message);
        this.status = status;
        this.message = message;
        this.fieldsError = fieldsError;
    }
}

module.exports = CustomError;