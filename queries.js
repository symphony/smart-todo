const db = require("./lib/db");

// == users ==
const getUserByName = (name) => {
  console.log('running query', name);
  return db.query(`SELECT * FROM users WHERE name = $1;`, [name])
  .then((data) => {
    console.log('returned data', data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.error(err);
  })
};

// == todos ==
const getAllTodos = (id) => {
  const queryParams = [`
  SELECT todos.*, name FROM todos
  JOIN categories ON categories.id = category_id
  ${id ? 'WHERE user_id = $1' : ''}
  `];
  if (id) queryParams.push([id]);


  return db.query(...queryParams)
  .then((data) => {
    console.log('query results', data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.error(err);
  })
};

// == alters ==
const deleteTodo = (id) => {
  const values = [id]
  const queryString = `
  DELETE FROM todos
  WHERE id = $1
  `;

  return db.query(queryString, values)
  .then((data) => {
    console.log('data from delete', data); // for testing
    return true;
  })
  .catch((err) => {
    console.error(err);
  })
};

// stretch getUserTodosByCategory(id, category)

module.exports = { getUserByName, getAllTodos, getUserTodos: getAllTodos, deleteTodo };


// -boilerplate code-
// db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
// -end boilerplate-
