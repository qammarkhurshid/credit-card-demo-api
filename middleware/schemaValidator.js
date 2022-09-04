const _ = require('lodash');
const Schemas = require('../schemas/creditCardValidation.schema.js');

module.exports = (useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;
  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put', 'get'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
    convert: true, // force convert to required types
  };

  // return the validation middleware
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (!_supportedMethods.includes(method)) {
      res.status(400).json({ message: `Invalid HTTP Method: http.${method} id not allowed for this route` });
    }

    if (!_.has(Schemas, route)) {
      res.status(400).json({ message: 'Invalid Schema' });
    }

    // get schema for the current route
    const _schema = _.get(Schemas, route);

    if (_schema) {
      // Validate req.body using the schema and validation options
      try {
        const { error } = _schema.validate(req.body, _validationOptions);
        if (error) {
          throw error;
        }
        next();
      } catch (err) {
        // Joi Error
        const JoiError = {
          status: 'failed',
          error: {
            original: err._object,

            // fetch only message and type from each error
            details: _.map(err.details, ({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type,
            })),
          },
        };
        // Custom Error
        const CustomError = {
          status: 'failed',
          error: 'Invalid request data. Please review request and try again.',
        };

        // Send back the JSON error response
        res.status(422).json(_useJoiError ? JoiError : CustomError);
      }
    } else {
      next();
    }
  };
};
