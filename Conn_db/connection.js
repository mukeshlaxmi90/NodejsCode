// // MySQL module import karo
// const mysql = require('mysql2');

// // Connection configuration
// const connection = mysql.createConnection({
//   host: '203.163.250.236',      // agar local machine me hai
//   user: 'pujachannew',           // aapka MySQL username
//   password: 'log', // aapka MySQL password
//   database: 'pujachannew'     // database ka naam
// });
// // Connect karo
// connection.connect(function(err) {
//   if (err) {
//     console.error('Error connecting: ' + err.stack);
//     return;
//   }
//   console.log('Connected as id ' + connection.threadId);
// });
// // Export connection
// module.exports = connection;
// const mysql = require("mysql2/promise");

// // Pool banate hain (better for production)
// const pool = mysql.createPool({
//   host: "203.163.250.236",
//   user: "pujachannew",
//   password: "log",
//   database: "pujachannew",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
// module.exports = pool;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_dpx8uJzBUM2P@ep-spring-silence-ady0ruea-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

