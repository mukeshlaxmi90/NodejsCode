const fetch = require('node-fetch');
console.log("mq");
async function getData() {
  try {
    console.log("m1");
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log("m2");  
    return data;    
  } catch (err) {
    console.log("mm1");
    console.error(err);
    console.log("mm2");
  }
}
module.exports = {
  getData
};