import { CelebrateError, isCelebrateError } from "celebrate";

class ErrorHandler extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ErrorHandler.prototype);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const handleKnownExceptions = (error, response) => {
  logger.error(error);
  const { statusCode, errorCode, message } = error;
  response
    .status(statusCode)
    .json({ errorMessage: `${errorCode} | ${message}` })
    .end();
};

const handleUnknownExceptions = (error, response) => {
  return response.status(500).json({ errorMessage: error }).end();
};

export const handleError = (error, response) => {
  if (isCelebrateError(error)) {
    const message = formatCelebrateErrors(error);
    return response.status(400).json({ errorMessage: message });
  }

  error instanceof ErrorHandler
    ? handleKnownExceptions(error, response)
    : handleUnknownExceptions(error, response);
};

function formatCelebrateErrors(error) {
  let message = "";
  error.details.forEach((validationError) => {
    if (message) {
      message += "\n";
    }
    message += validationError.message;
  });
  return message;
}
