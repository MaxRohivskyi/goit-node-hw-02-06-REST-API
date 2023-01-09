const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const { HOST_DB, PORT = 3000 } = process.env;

const main = async () => {
  try {
    if (!HOST_DB) {
      throw new Error('HOST_DB not set!');
    }

    await mongoose.connect(HOST_DB);
    console.log(`Database connection successful${HOST_DB}`);

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Server not running. Error:', error.message);
    process.exit(1);
  }
};
main();
