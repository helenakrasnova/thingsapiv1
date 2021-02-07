const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ type: 'application/json' }));

app.use(morgan('short'));

app.use(cors());

app.use('/api', api);

app.all('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Host started and listening on PORT:${PORT}`);
});