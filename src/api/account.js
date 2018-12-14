const db = require('../server/database');

//GET - 'SELECT * from ?? WHERE ?? = ?'
//UPDATE SET - 'UPDATE ?? SET ? WHERE ?? = ?'
//INSERT SET - 'INSERT INTO ?? SET ?'
//INSERT BULK - 'INSERT INTO ?? (??) VALUES ?'
//DELETE - 'DELETE FROM ?? WHERE ?? = ?'

module.exports = {

  isAvailableUsername: function(username) {
    console.log(`DB: Checking to see if account with username '${username}' already exists...`);
    return db.query("SELECT 1 AS 'exist' FROM users WHERE username = ?", [username]);
  },

  createUser: function(username, password) {
    console.log(`Adding user '${username}' to database...`);
    return db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
  },

  getExistingUser: function(username) {
    console.log(`Getting a user with username '${username}'...`);
    return db.query("SELECT id, username, password FROM users WHERE username = ?", [username]);
  }

}
