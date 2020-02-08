const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');
const logger = require('morgan');

const app = express();
const port = 8000;
app.use(logger('dev'));

app.listen(port, () => console.log(`Server listening on port ${port}!`));

const clientHost = `http://${process.env.CLIENT_HOST}`; // for local and docker-compose development
// process.env refers to environment variable values. Docker-Compose sets the environment variables we've created in the .envs folder.
console.log('test', clientHost);
const whitelist = [clientHost];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors()); // allow cors
app.use(bodyParser.json());

app.get('/api/get-users', db.getUsers);
app.post('/api/set-user', db.setUser);
app.post('/api/update-user', db.updateUser);
app.post('/api/delete-user', db.deleteUser);
