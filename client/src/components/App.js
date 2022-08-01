import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Footer from "./Footer";
import Cart from "./Cart";
import HomePage from "./HomeFeed";
import Items from "./Items";
import Checkout from "./Checkout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Div>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/item/:item" element={<Items/>} />
            <Route exact path="/checkout" element={<Checkout/>}/>
          </Routes>
        </Div>
        <Footer />
      </BrowserRouter>
    </>
  );
};
const Div = styled.div`
  display: flex;
  border-right: solid 1px lightgray;
  border-left: solid 1px lightgray;

  margin: auto;
  width: 70%;
  height: 100%;
  min-height: 1250px;
`;

export default App;
