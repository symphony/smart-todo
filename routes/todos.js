const express = require("express");
const router = express.Router();
const { findCategory, getDescription } = require("../api");
const {
  getAllTodos,
  deleteTodo,
  insertNewTodo,
  getCategoryByName,
  editTodo,
  setCompleted,
} = require("../queries");


// Render all todos
router.get("/", (req, res) => {
  const userId = req.cookies.user;
  getAllTodos(userId)
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      console.log("error getting user's todos");
      console.error(err);
    });
});


//New todo request
router.post("/", (req, res) => {
  const {title} = req.body;
  // get category name from external apis
  findCategory(title)

    //gets category object from database
    .then(getCategoryByName)
    .then((cat) => {

      // nested so we still have access to cat object
      getDescription(cat.category, title)
        .then((description) => {
          const user_id = req.cookies.user;
          const category_id = cat.id;

          // create new todo in database
          return insertNewTodo({ user_id, title, description, category_id });
        })
        .then((todo) => {
          // return new todo back to front end
          res.json(todo || null);
        })
        .catch((err) => {
          console.log("error adding new todo");
          console.error(err);
        });
    });
});


// Edit todo
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, category_id, description } = req.body;
  editTodo({ id, title, category_id, description })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("error editing todo");
      console.error(err);
    });
});


// Complete todo
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const complete = req.body.complete;
  setCompleted({ id, complete })
    .then((todo) => {
      console.log(todo.description, todo.completed ? "todo done" : "todo not done");
      res.json(todo);
    })
    .catch((err) => {
      console.log("error checking off todo");
      console.error(err);
    });
});


// delete todo
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteTodo(id)
    .then((data) => {
      res.send(true);
    })
    .catch((err) => {
      console.log("error deleting todo");
      console.error(err);
    });
});

module.exports = router;
