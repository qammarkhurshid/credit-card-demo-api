// load Joi module
const Joi = require('joi');

// accepts name only as letters and converts to uppercase
const name = Joi.string()
  .regex(/^[A-Z]+$/)
  .uppercase();

const creditCardSchema = Joi.object().keys({
  name: name.required(),
  number: Joi.string().min(16).required(),
  cvv: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/),
  expiresOn: Joi.object().required(),
});

// export the schemas
module.exports = {
  '/credit-card': creditCardSchema,
};
