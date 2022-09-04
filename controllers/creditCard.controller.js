const luhn = require('luhn');
const db = require('../models');
const { errorMessages } = require('../constants');
const CreditCard = db.creditCard;
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

/*Secret key can be stored in .env file or
another remote server and fetched securely when needed 
For demo purposes, let's store it in .env*/
const secretKey = process.env.SECRET_DECRYPT_KEY;

const _encrypt = (text) => {
  const iv = crypto.randomBytes(16); // initialization vector
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const hash = `${iv.toString('hex')}${encrypted.toString('hex')}`;

  return hash;
};

/* If we need to decrypt, we can use this function */
const _decrypt = (hash) => {
  const iv = hash.slice(0, 32);
  const content = hash.slice(32);
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

const registerCreditCard = async (creditCardInfo) => {
  const isValid = luhn.validate(creditCardInfo.number);
  /* Will throw if the card number is not as per the Luhn Algorithm */
  if (!isValid) {
    throw new Error(errorMessages.INVALID_CREDIT_CARD_NUMBER);
  }
  const encryptedCardNum = _encrypt(creditCardInfo.number);
  const encryptedCVV = _encrypt(creditCardInfo.cvv);
  const createdCreditCard = await CreditCard.create({
    number: encryptedCardNum,
    cvv: encryptedCVV,
    cardHolder: creditCardInfo.name,
    expireMonth: creditCardInfo.expiresOn.month,
    expireYear: creditCardInfo.expiresOn.year,
  });
  return createdCreditCard;
};

module.exports = {
  registerCreditCard,
};
