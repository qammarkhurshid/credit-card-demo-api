const { HOST, USER, PASSWORD, DB, dialect } = process.env;
module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
