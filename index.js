import pg from 'pg';

import express from 'express';

const { Pool } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: 'jitcorn',
  host: 'localhost',
  database: 'cats',
  port: 5432,
};

const pool = new Pool(pgConnectionConfigs);

const app = express();

const PORT = 3004;
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  console.log('request came in');

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log('Error executing query', error.stack);
      response.status(503).send(result.rows);
      return;
    }

    console.log(result.rows[1].name);

    response.send(result.rows);
  };

  pool.query('SELECT * from cats', whenDoneWithQuery);
});

app.listen(PORT);
