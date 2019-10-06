const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/graphql', graphqlHTTP(
  {
    schema,
    graphiql: true,
  },
));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server start on port: ${PORT}\n http://localhost:${PORT}/`));
