import app from './app.js';
import { env } from './config/env.js';
import { checkConnection } from './db/checkConnection.js';

async function startServer() {
  await checkConnection();

  app.listen(env.port, () => {
    console.log(`🚀 Server is running on port ${env.port}`);
  });
}

startServer();
