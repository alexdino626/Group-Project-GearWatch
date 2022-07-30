const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// *********************************************************** query all items
const handleGetItems = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  //query all items from db
  const items = await db.collection("Items").find().toArray();

  //response
  items.length === 0
    ? res.status(404).json({
        status: 404,
        message: "Not Found",
      })
    : res.status(200).json({
        status: 200,
        data: items,
        message: "This is infos of all items",
      });

  //   close the connection to the database server
  client.close();
};

const handleGetItem = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // requesting parameter of URL
  const {itemId} = req.params

  // connect to the client
  await client.connect();
  // declare 'db'
  const db = client.db("our-project");

  //find item by _id from db
  const item = await db.collection("Items").findOne({_id: itemId});
  //response
  if(!item){
    res.status(404).json({status: 404, message: "Items not found"})
  }else {
    res.status(200).json({status:200, data: item})
  }
  
//   close the connection to the database server
  client.close();
};

module.exports = 
  { handleGetItems, handleGetItem }
;
