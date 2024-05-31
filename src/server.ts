import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

const connectionOptions = {
  autoIndex: true, // Ensure autoIndex is enabled
  // Other options
};

async function main() {
  try {
    await mongoose.connect(config.database_url as string, connectionOptions);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
