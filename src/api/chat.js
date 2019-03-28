const db = require('../server/database');

//GET - 'SELECT * from ?? WHERE ?? = ?'
//UPDATE SET - 'UPDATE ?? SET ? WHERE ?? = ?'
//INSERT SET - 'INSERT INTO ?? SET ?'
//INSERT BULK - 'INSERT INTO ?? (??) VALUES ?'
//DELETE - 'DELETE FROM ?? WHERE ?? = ?'

module.exports = {

  // Insert a new chatroom into chatrooms table
  createRoom: function(chatroomName, userId) {
    console.log(`Creating chatroom named: ${chatroomName}, created by: id #${userId}`);
    return db.query("INSERT INTO chatrooms (name, members) VALUES (?, ?)", [chatroomName, userId]);
  },

  // Insert a new chatroom member into members table
  insertMember: function(userId, serverId, chatroomName, urlHash) {
    console.log(`Inserting user #${userId} into server #${serverId}`);
    return db.query("INSERT INTO members (chatroom_id, user_id, name, url) VALUES (?, ?, ?, ?)", [serverId, userId, chatroomName, urlHash]);
  },

  // Get all chatrooms belonging to a user
  getRooms: function(userId) {
    console.log(`Getting all chatrooms for user with id: #${userId}`);
    return db.query("SELECT members.chatroom_id, chatrooms.name FROM members INNER JOIN chatrooms ON chatrooms.chatroom_id=members.chatroom_id WHERE user_id = ?", [userId]);
  },

  // Find a member in members table
  findMember: function(userId, serverId) {
    console.log(`Looking for userId: ${userId} in serverId: ${serverId}`);
    return db.query("SELECT * FROM members WHERE chatroom_id = ? AND user_id = ?", [serverId, userId]);
  }

}
