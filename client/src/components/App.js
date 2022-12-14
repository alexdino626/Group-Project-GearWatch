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
import Confirm from "./Confirmed";
import Welcome from "./Welcome";

const App = () => {
  // this our app where all our routes are done
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Div>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/product" element={<HomePage />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/item/:item" element={<Items />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/confirmed" element={<Confirm />} />
          </Routes>
        </Div>
        <Footer />
      </BrowserRouter>
    </>
  );
};
const Div = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 1300px;
`;

export default App;
