const items = require("./data/items.json");
const companies = require("./data/companies.json");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("our-project");

  await db.collection("Items").insertMany(items);
  await db.collection("Companies").insertMany(companies);

  client.close();
};
batchImport();
