import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Footer from "./Footer";
import Cart from "./Cart";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Div>
          <Routes>
            <Route exact path="/" element={"app"} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/items/:item" element={"item"} />
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

  height: 87vh;
`;

export default App;
