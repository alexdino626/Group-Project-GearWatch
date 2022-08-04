import React from "react";
import img from "./imgs/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

// this our welcome page to make it more welcoming
const Welcome = () => {
  return (
    <Wrapper>
      <Div>
        <Img>
          <ImgSize src={img} />
          <Button to={"/product"}> Browse our selection</Button>
        </Img>
        
          
      </Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`

`;
const ImgSize = styled.img`

max-height: 970px;
max-width: 100%;
min-width:1100px ;
box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  border: solid 1px lightgrey;
  border-radius: 20px;
`
const Button = styled(Link)`
position: absolute;
left:10%;
top: 60%;
  text-decoration: none;
  transition: all 0.5s ease;
  color: black;
  border: 3px solid black;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  font-size: 35px;
  background-color: transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

const Img = styled.div`
  height: 100px;
  height: fit-content;
  position: relative;

`;
const Div = styled.div`

`;

export default Welcome;
