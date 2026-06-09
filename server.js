const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const app = express();

app.use(express.json());
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/user')
  .then(() => console.log('MongoDB connected: mongodb://localhost:27017/user'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
