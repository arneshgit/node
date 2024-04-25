const http = require('http');
// Define the port the server will listen on
const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/mongo');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const threadRouter = require('./routes/thread')


app.use(bodyParser.json());
// Mount the users routes
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/thread',threadRouter);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
