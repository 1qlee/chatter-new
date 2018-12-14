const mysql = require("mysql");

// Database Connection for Production

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);

// Database Connection for Development
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
}

const pool = mysql.createPool(config);

module.exports = {
  query: function(sql, args) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con){
        if (!err) {
          con.query(sql, args, (error, results, fields) => {
            con.release();
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        }
        else {
          con.release();
          throw new Error(err);
        }
      });
    });
  }
};
