
const saveLocation = require('../services/datainsertService');

// Recursive flatten function
function flattenObject(obj, parentKey = '', result = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Flatten nested objects
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}


exports.showDataInsertForm = async (req, res) => {
  try {
    const data = await saveLocation.getData(); // service call
    // Ensure data is an array
    const usersArray = Array.isArray(data) ? data : [];
    // Flatten each user dynamically
    const flattenedUsers = usersArray.map(u => flattenObject(u));
    // Dynamically get all columns from first row
    const columns = flattenedUsers.length > 0 ? Object.keys(flattenedUsers[0]) : [];
    res.render("UserView/datainsert", { 
      title: "Data Insert Form", 
      layout: 'layout',
      users: flattenedUsers,
      columns   
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading data");
  }
};


// exports.apigetData=async (reg,res)=>{
//  try{
//  const data = await saveLocation.getData(); // service call
//  console.log("m4");
//  res.json(data); // response client को भेज दो
//  }
//  catch{
//   console.log("mm3");
//  }
// };
