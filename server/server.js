const db = require("./config/db");
const app = require("./app");
const { PORT } = require("./config/config");

//listen server
const startServer = async () => {
  try {
    // Connect databases
    await db();
    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })

    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down...');
      server.close(() => {
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};
startServer()