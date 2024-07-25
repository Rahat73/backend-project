import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';
import seedSuperAdmin from './DB';

let server: Server;

const connectionOptions = {
  autoIndex: true, // Ensure autoIndex is enabled
  // Other options
};

async function main() {
  try {
    await mongoose.connect(config.database_url as string, connectionOptions);

    seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.log('Shutting down... 💤💤💤💤💤');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception thrown', err);
  console.log('Shutting Down... 💤💤💤💤💤');
  process.exit(1);
});
