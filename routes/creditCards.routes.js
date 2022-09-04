const creditCardRouter = require('express').Router();
const SchemaValidator = require('../middleware/schemaValidator');
const validateRequest = SchemaValidator(true);

const creditCardController = require('../controllers/creditCard.controller');
const { errorMessages } = require('../constants');

creditCardRouter.post('/credit-card', validateRequest, async (req, res, next) => {
  try {
    const { body } = req;
    const response = await creditCardController.registerCreditCard(body);
    return res.status(201).json({ success: true, response });
  } catch (error) {
    console.error('[Stack trace]', error);
    return res.status(400).json(error.message || errorMessages.GENERIC_ERROR);
  }
});

module.exports = creditCardRouter;
