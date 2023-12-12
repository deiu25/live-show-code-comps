require("dotenv").config();

const connectDatabase = require('./config/database');
const app = require('./app');
const PORT = process.env.PORT || 5000;

//Handle Uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1)
})

//Connecting to database
connectDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode.`);
  });

  //Handle unhandled promise rejections
  process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
  })

}).catch((error) => {
  console.log(`Could not connect to database: ${error}`);
});

