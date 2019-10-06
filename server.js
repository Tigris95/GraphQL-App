const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/graphql', graphqlHTTP(
  {
    schema,
    graphiql: true,
  },
));


app.get('/', (req, res) => {
  res.send('hello from api');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server start on port: ${PORT}\n http://localhost:3000/`));
