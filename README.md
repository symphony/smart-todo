# Smart ToDo

  A single page app to keep track of your tasks easily and categorize them automatically via api requests. Data stored via PostgreSQL.  
  *Built for educational purposes only as part of the Lighthouse Labs Web Development Bootcamp.*

## Features

- Save Todos to individual profiles via PostgreSQL
- Auto categorize notes via public API queries
- Update and Delete Todos
- Mobile and Desktop View


### Homepage 

<img alt="Screenshot of Smart Todo's Homepage" src="docs/todo1.png?raw=true" name="Homepage" width="1000"></img>

### Dashboard 

<img alt="Screenshot of Smart Todo's Dashboard" src="docs/todo2.png?raw=true" name="Todo Dashboard" width="1000"></img>

### Edit Mode

<img alt="Screenshot of Smart Todo's Todo Edit Mode" src="docs/todo3.png?raw=true" name="Edit Mode" width="1000"></img>

### Responsive Design

<img alt="Screenshot of Smart Todo's Mobile View" src="docs/todo4.png?raw=true" name="Mobile View" width="600"></img>

---

## Getting Started

-Warning- As it stands this App requires an account and access to various APIs from [rapidapi.com](https://rapidapi.com), as well as [uclassify.com](https://uclassify.com) and [rawg.io](https://rawg.io). You may still download the repo and run the server, but the external API calls will not work correctly. API keys can be added to your .env file, or APIs can be changed in api.js.

1. `git clone git@github.com:symphony/smart-todo.git && cd smart-todo`  
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`  
3. Update the .env file with your correct local information (This step requires a local SQL Database to be running on your machine. We are using PostgreSQL)
  - username: `labber`  
  - password: `labber`  
  - database: `midterm`  
4. Install dependencies: `npm i`  
5. Fix to binaries for sass: `npm rebuild node-sass`  
6. Reset database: `npm run db:reset`  
  - Check the db folder to see what gets created and seeded in the SDB  
7. Run the server: `npm run local`  
  - Note: nodemon is used, so you should not have to restart your server  
8. Visit `http://localhost:3000/`  

## Warnings & Tips

- See docs/GETTING_STARTED.md for more information
- A database will need to be run and configured to in the .env and lib/db.js file
- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies
- Node 10.x or above
- NPM 5.x or above
- axios 0.2x
- express 4.x
- pg 8.x
- chalk 2.x,
- dotenv 2.x
- morgan 1.x
- sass 1.x
- cookie-parser 1.x

## Dev Dependencies
- nodemon 2.x

## Other Resources
- Splash Page: [Codepen.io](https://codepen.io/imathis/pen/ZYEWrw)
- Typing Effect: [CSS-Tricks.com](https://css-tricks.com/snippets/css/typewriter-effect/)
- Contributors: [@symphony](https://github.com/symphony), [@MitchScho](https://github.com/MitchScho), [@KellyAtmore](https://github.com/KellyAtmore)
- Forked from: [@Lighthouse-labs/node-skeleton](https://github.com/lighthouse-labs/node-skeleton)
