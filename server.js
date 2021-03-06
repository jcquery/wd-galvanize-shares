'use strict';

const express = require('express');
const morgan =require('morgan');
const path = require('path');
const posts = require('./routes/posts');
const app = express();
const bodyParser = require('body-parser');

app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

    default:
}

app.use(express.static(path.join(__dirname, 'public')));

// CSRF protection
app.use('/api', (req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
})

app.use(bodyParser.json());

app.use('/api', posts);

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, _req, _res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
})


const port = process.env.PORT || 8000;


app.listen(port, () => {
  // esling-disable-next-line no-console
  console.log('Listening on port', port);
});
