const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



