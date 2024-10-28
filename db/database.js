const mongoose = require("mongoose");


//mongodb connection 
const Mongodb = async () => {
    try {
      mongoose.connect(process.env.MONGODB_URL)
    console.log(`=======connected to Mongodb=======`)
  } catch (error) {
      console.log(`Error while connected to Mongodb`, error);
  }   
}


module.exports = { mongoDbConnection: Mongodb };