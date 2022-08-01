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
        message: "Not found Or Cart is empty",
      })
    : res.status(200).json({
        status: 200,
        data: items,
        message: "This is infos of all items",
      });

  //   close the connection to the database server
  client.close();
};
// *********************************************************** handle get a specific item with Id
const handleGetItem = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // requesting parameter of URL
  const { itemId } = req.params;

  // connect to the client
  await client.connect();
  // declare 'db'
  const db = client.db("our-project");

  //find item by _id from db
  const item = await db.collection("Items").findOne({ _id: parseInt(itemId) });
  //response
  if (!item) {
    res.status(404).json({ status: 404, message: "Items not found" });
  } else {
    res.status(200).json({ status: 200, data: item });
  }

  //   close the connection to the database server
  client.close();
};

// *********************************************************** handler for adding item to cart
const handleAddItemToCart = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  //add item ( req.body ) to collection "cart".
  await db.collection("cart").insertOne(req.body);

  //response
  res.status(200).json({
    status: 200,
    message: `item ${req.body._id} added to cart`,
  });

  //   close the connection to the database server
  client.close();
};

// *********************************************************** handler for deleting item from cart
const handleDeleteItemFromCart = async (req, res) => {
  const _id = req.body._id;
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  //add item ( req.body ) to collection "cart".
  const result = await db.collection("cart").deleteOne({ _id });
  console.log(result);
  //response (if delete success, result ={ acknowledged: true, deletedCount: 1 })

  result.deletedCount === 1
    ? res.status(200).json({
        status: 200,
        message: `item ${req.body._id} removed from cart`,
      })
    : res.status(400).json({
        status: 400,
        message: "oops, something went wrong",
      });

  //   close the connection to the database server
  client.close();
};

// *********************************************************** handler for changing item quantity in cart
const handleChangeItemQuantityInCart = async (req, res) => {
  const query = req.body._id;
  const newQuantity = req.body.quantity;

  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  //add item ( req.body ) to collection "cart".
  const result = await db
    .collection("cart")
    .updateOne({ _id: query }, { $set: { quantity: newQuantity } });

  //response (if success, result={
  //   acknowledged: true,
  //   modifiedCount: 0,
  //   upsertedId: null,
  //   upsertedCount: 0,
  //   matchedCount: 1
  // })
  result.modifiedCount === 1
    ? res.status(200).json({
        status: 200,
        message: `now we have ${req.body.quantity} item ${req.body._id} in cart`,
      })
    : res.status(400).json({
        status: 400,
        message: "oops, something went wrong",
      });

  //   close the connection to the database server
  client.close();
};

// *********************************************************** handler for getting cart info
const handleGetCart = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  // get cart info

  const result = await db.collection("cart").find().toArray();

  //response(fail: result will be an empty array )
  result.length === 0
    ? res.status(404).json({
        status: 404,
        message: "Not found Or cart is empty",
      })
    : res.status(200).json({
        status: 200,
        data: result,
        message: "Here is the cart info, have fun :)",
      });

  //   close the connection to the database server
  client.close();
};
// *********************************************************** handler for getting items of a specific category

const handleGetCategory = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // requesting parameter of URL
  const { categoryId } = req.params;

  // connect to the client
  await client.connect();
  // declare 'db'
  const db = client.db("our-project");

  //find category by categoryId from db
  const result = await db
    .collection("Items")
    .find({ category: categoryId })
    .toArray();
  //response
  if (!result) {
    res.status(404).json({ status: 404, message: "Category not found" });
  } else {
    res.status(200).json({ status: 200, data: result });
  }

  //   close the connection to the database server
  client.close();
};
// *********************************************************** handler for getting order history

const handleGetOrderHistory = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  // get order history info

  const result = await db.collection("Order History").find().toArray();

  //response
  result.length === 0
    ? res.status(404).json({
        status: 404,
        message: "You have no past orders",
      })
    : res.status(200).json({
        status: 200,
        data: result,
      });

  //   close the connection to the database server
  client.close();
};

const handleGetOrder = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // requesting parameter of URL
  const { orderId } = req.params;

  // connect to the client
  await client.connect();
  // declare 'db'
  const db = client.db("our-project");

  //find item by _id from db
  const order = await db.collection("Order History").findOne({ _id: orderId });
  //response
  if (!order) {
    res.status(404).json({ status: 404, message: "Order not found" });
  } else {
    res.status(200).json({ status: 200, data: order });
  }

  //   close the connection to the database server
  client.close();
};

// *********************************************************** handler for making an order
// expect from frontend{ itemList : [ {item1 info and quantity},{item2 info and quantity}, {item3 info and quantity} ], cardNumber:*, address:, firstName:, lastName: }
const handlePurchase = async (req, res) => {
  // assume we receive an array of items
  const shoppingList = req.body.itemList;
  // generate a random number as order history _id
  const order_id = Date.now() - Math.floor(Math.random() * 300000);

  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // declare 'db'
  const db = client.db("our-project");

  // validate payment information
  if (!req.body.cardNumber.length !== 16 || req.body.cardNumber.includes(" ")) {
    return res.status(400).json({
      status: 400,
      message: "Please provide valid card information! Should be 16 digit.",
    });
  }

  // validate if we have enough quantity in stock
  for (let item of shoppingList) {
    if (item.numInStock < item.quantity) {
      return res.status(400).json({
        status: 400,
        message: `Sorry, we don't have enough _id:${item.id}, name: ${item.name} in stock.`,
      });
      //update the stock
    } else {
      await db
        .collection("Items")
        .updateOne(
          { _id: item._id },
          { $set: { numInStock: item.numInStock - item.quantity } }
        );
    }
  }

  // To Do :if other things need to be validated

  // response - order success
  res.status(200).json({
    status: 200,
    message: "Order Placed",
  });

  // save order history
  await db.collection("Order History").insertOne({
    _id: order_id,
    orderNumber: order_id,
    orderedItems: req.body.itemList,
    shippingAddress: req.body.address,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  //empty the cart, when pass un empty{}, MongoDB matches all documents in the collection and deletes them
  await db.collection("cart").deleteMany({});

  //   close the connection to the database server
  client.close();
};

module.exports = {
  handleGetItems,
  handleGetItem,
  handleAddItemToCart,
  handleDeleteItemFromCart,
  handleChangeItemQuantityInCart,
  handleGetCart,
  handleGetCategory,
  handleGetOrderHistory,
  handleGetOrder,
  handlePurchase,
};
