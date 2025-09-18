const bcrypt = require("bcrypt");
const pool = require('../Conn_db/connection');

exports.login = async (username, password) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.password, r.name as role  FROM users u
     LEFT JOIN roles r ON u.role_id = r.id
     WHERE u.username = $1`,
    [username]
  );
console.log('upp',username,password);
  const user = result.rows[0];
  console.log('user',user);
  if (!user) {
    throw new Error("User not found");
  }
  console.log("p,u",password, user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('ismatch',isMatch);
  if (password !== user.password) {
    throw new Error("Invalid password");
  }

  return { id: user.id, name: user.username, role: user.role };
};
