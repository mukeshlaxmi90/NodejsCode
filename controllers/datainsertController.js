exports.showDataInsertForm = (req, res) => {
  res.render("UserView/datainsert",
     { 
      title: "Data Insert Form", 
      layout: 'layout'
    });
};
