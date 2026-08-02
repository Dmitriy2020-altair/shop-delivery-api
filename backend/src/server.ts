import app from './app.js';
import { checkConnection } from './db/checkConnection.js';

const PORT = 3000;

async function startServer() {
  await checkConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

startServer();
