const entryService = require("../services/Viewservice");

exports.showDataView = async (req, res) => {
  try {
    // Service se data lao
    const { rows } = await entryService.getAllEntries();
    // Dynamic columns generate karne ke liye Object.keys use karte hain
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    // EJS render
    res.render("UserView/Dataview", 
        { users: rows, columns,       
        });
     //res.render("UserView/Dataview", { users: [], columns: [], layout: false });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).render("error", { message: "Failed to load data" });
  }
};
