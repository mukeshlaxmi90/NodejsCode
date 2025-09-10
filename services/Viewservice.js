const db = require("../Conn_db/connection");

exports.getAllEntries = async () => {
  const query = " SELECT * FROM get_users();";
  const result = await db.query(query);
  console.log("r",result);
  return result; // { rows: [...] }
};
