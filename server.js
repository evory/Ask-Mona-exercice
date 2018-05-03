const express = require('express');
const app     = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;


/***** MIDDLEWARE *****/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/***** ROUTES *****/

const author = require('./routes/author.js');
const create = require('./routes/create.js');
const artwork = require('./routes/artwork.js');
const translation = require('./routes/translation.js');

app.use('/author', author);
app.use('/create', create);
app.use('/artwork', artwork);
app.use('/translation', translation);


/***** LISTEN *****/

app.listen(PORT, () => {
    console.log(`Listen on port: ${PORT}`);
})  