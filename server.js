const { app } = require('./app.js');

app.listen(3000, () => {
  console.log('=================================');
  console.log(`***SERVER STARTED ON PORT ${3000}***`);
  console.log('=================================');
});
