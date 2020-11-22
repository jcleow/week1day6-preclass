import pg from 'pg';

const { Client } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: 'jitcorn',
  host: 'localhost',
  database: 'recipes',
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
const client = new Client(pgConnectionConfigs);

// make the connection to the server
client.connect();

// write the SQL query
const recipeQuery = 'SELECT * from recipes WHERE id=1';

// run the SQL query
client.query(recipeQuery, (recipeQueryError, recipeQueryResult) => {
  // this error is anything that goes wrong with the query
  if (recipeQueryError) {
    console.log('recipe query error', recipeQueryError);
  } else {
    // rows key has the data
    console.log(recipeQueryResult.rows);

    if (recipeQueryResult.rows.length <= 0) {
      console.log('no results!!!11!!!');
      return;
    }
    console.log(recipeQueryResult, 'recipeQueryResult');
    const recipe = recipeQueryResult.rows[0];

    /* ======================================== */
    /* ======================================== */

    // this is where the magic happens.
    // use the result of the first query in the second.

    /* ======================================== */
    /* ======================================== */
    const categoryQuery = `SELECT * FROM categories WHERE id=${recipe.category_id}`;

    client.query(categoryQuery, (categoryQueryError, categoryQueryResult) => {
      // this error is anything that goes wrong with the query
      if (categoryQueryError) {
        console.log('category query error', categoryQueryError);
      } else {
        // rows key has the data
        console.log(categoryQueryResult.rows);
      }

      // close the connection
      client.end();
    });
  }
});
