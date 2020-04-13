const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.json());

const port = 3000;

app.use('/', router);

app.listen(port, () => console.log(`Pasterze is listening on port ${port}!`));
