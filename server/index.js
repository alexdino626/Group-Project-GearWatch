"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  handleGetItems,
  handleGetItem,
  handleAddItemToCart,
  handleDeleteItemFromCart,
  handleChangeItemQuantityInCart,
  handleGetCart,
  handlePurchase,
} = require("./handler");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  //endpoints for getting all items
  .get("/items", (req, res) => handleGetItems(req, res))
  //endpoint to get an item by id
  .get("/item/:itemId", handleGetItem)

  // endpoint for adding an item to cart(need customerId,itemsId,quantities of item from frontend)
  .post("/cart", handleAddItemToCart)

  // endpoint for deleting an item from cart(please containt itemId in req.body)
  .delete("/cart", handleDeleteItemFromCart)

  // endpoint for changing quantity of an item in cart
  .patch("/cart", handleChangeItemQuantityInCart)

  //endpoint for getting cart infos
  .get("/cart", handleGetCart)

  // endpoint for making an order
  .post("/purchase", handlePurchase)

  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
