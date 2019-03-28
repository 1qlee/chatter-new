require('dotenv').config();
// Modules and set-up
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./database');
const port = 8080;
// Parsing packages
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
// Authentication tools
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");
const { body, check, validationResult } = require('express-validator/check');
const saltRounds = 10;
// Homemade database API
const account = require("../api/account");
const chat = require("../api/chat");

// Read data with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Read cookies
app.use(cookieParser());

// Create a session store in database
let options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
};
let sessionStore = new MySQLStore(options);

// Create a session cookie once a user logs in
app.use(session({
  secret: uuid(process.env.SECRET),
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  expires: new Date(Date.now() + 2000000)
}));

// Intialize passportjs
app.use(passport.initialize());
app.use(passport.session());

// Create global var for IF authenticated user
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Passport function for logging in an existing user
passport.use(new LocalStrategy(
  (username, password, done) => {
    const db = require('./database');
    // Check to see if we have a user with the provided credentials
    account.getExistingUser(username).then((result) => {
      if (result.length === 0) {
        done(null, false, { message: "User doesn't exist" });
      }
      else {
        const user = result[0];
        const hash = user.password.toString();

        // Compare login password to database password
        bcrypt.compare(password, hash, (err, response) => {
          if (response === true) {
            delete user.password;
            return done(null, { username: user.username, userId: user.id });
          }
          else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      }
    }).catch((err) => {
      done(err);
    });
  }
));

// Serve dist static folder
app.use(express.static('dist'));

// Route to open client-server connection and send logged-in status
app.get('/api/hello', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});


// Route for logging a user out
app.get('/api/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.clearCookie("connect.sid");
      res.json({ isLoggedOut: true });
    }
  });
});

// Route for getting a user's chatrooms
app.get('/api/get/chatrooms', (req, res) => {
  const { userId } = req.user;

  chat.getRooms(userId).then((result) => {
    console.log(result);
    res.send(result);
  });
});

// Route for logging a user in
app.post('/api/login', [
  body('username').trim().escape(),
  passport.authenticate('local')
], (req, res) => {
  req.login(req.user, (err) => {
    if (err) { return next(err); }
    return res.json({ username: req.user.username, userId: req.user.userId, isAuthenticated: req.isAuthenticated() });
  });
});

// Route for signing up a user
app.post('/api/signup', [
  body('username').not().isEmpty().withMessage(" cannot be empty")
  .isAlphanumeric().withMessage(" must be alphanumeric")
  .isLength({ min: 4, max: 15 }).withMessage(" must be between 4 - 15 characters")
  .custom(username => {
    return account.isAvailableUsername(username).then(result => {
      if (result.length > 0) {
        throw new Error(" is already in use");
      }
    });
  })
  .trim().escape(),
  body('password').not().isEmpty().withMessage(" cannot be empty")
  .isLength({ max: 100 }).withMessage(" must be less than 100 characters")
], (req, res) => {
  // Variables from form input
  const body = req.body;
  const { username } = body;
  const { password } = body;
  // Custom error formatting
  const errorFormatter = ({ msg, param }) => {
    return {
      field: param,
      error: msg
    };
  };
  const result = validationResult(req).formatWith(errorFormatter);
  const formattedResult = [];
  // Create an array with each error pushed in
  for (let item of result.array()) {
    formattedResult.push(`${item.field.charAt(0).toUpperCase() + item.field.slice(1)} ${item.error}`);
  }
  // Send errors if there are any, otherwise create a user in DB
  if (!result.isEmpty()) {
    formattedResult.unshift("Error");
    res.json(formattedResult);
  }
  else {
    // Create a user in the DB with a hashed password and send user data to client
    bcrypt.hash(password, saltRounds, (err, hash) => {
      account.createUser(username, hash).then((result) => {
        const userId = result.insertId;
        const user = { username: username, userId: userId };
        console.log("Signing in user:", user);
        req.login(user, (err) => {
          if (err) { return next(err); }
          res.json({ username: username, userId: userId, isAuthenticated: req.isAuthenticated() });
        });
      });
    });
  }
});

// Route for creating a chatroom
app.post('/api/create/chatroom', (req, res) => {
  // Variables from form input (chatroomName and userId)
  const body = req.body;
  const { chatroomName } = body;
  const { userId } = body;

  console.log(`Got a request to create ${chatroomName} by ${userId}`);

  // Create a chatroom record in the database
  chat.createRoom(chatroomName, userId).then((result) => {
    const chatroomId = result.insertId;
    const urlHash = uuid(chatroomName);
    // Create a member record that corresponds to created chatroom and its creator
    chat.insertMember(userId, chatroomId, chatroomName, urlHash).then((result) => {
      return res.json({ chatroomId: chatroomId, name: chatroomName, url: urlHash });
    });
  });
});

// Route for joining an existing chatroom
app.post('/api/join/chatroom', (req, res) => {
  // Variables from form input (chatroomName and userId)
  const body = req.body;
  const { chatroomId } = body;
  const { userId } = body;

  // Check if this user is already in this chatroom
  chat.findMember(userId, chatroomId).then((result) => {
    if (result.length) {
      res.json({ chatroomId: result.chatroom_id, userId: result.user_id, name: result.name });
    }
    else {
      return res.json({ error: "Chatroom doesn't exist!" });
    }
  });

});

// store user id in a session
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

// read user id from a session
passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

function authenticationMiddleware() {
  return(req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) {
      return next();
    }

    res.json({ isAuthenticated: false });
  }
}

// Manage socket events
io.sockets.on("connection", (client) => {
  console.log("New client connected");

  client.on("subscribe", (chatroom) => {
    console.log(`${chatroom.user.username} joined ${chatroom.name}`);
    client.join(chatroom);
  });

  client.on("unsubscribe", (chatroom) => {
    console.log(`${chatroom.user.username} left ${chatroom.name}`);
    client.leave(chatroom);
  });

  client.on("message", (data) => {
    console.log(data);
    client.to("serber").emit("message", data);
  });

  client.on("disconnect", (data) => {
    console.log(data);
    client.emit("message", data);
  })
});

// start server
server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});

// webpage for server
app.get("/", (req,res) => {
  res.send("<h1>Server working...</h1>");
})
