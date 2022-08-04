import React from "react"
import img from "./imgs/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom";

const Welcome = () => {

return (
    <Wrapper>
    <Img><img src={img} width="1342" height="800"/></Img>
    <Text><Button to={"/product"}> Browse our selection</Button></Text>
    </Wrapper>
)
}

const Wrapper = styled.div`
`

const Text = styled.div`
margin-top:  340px;
`;

const Button = styled(Link)`
    text-decoration: none;
    margin-left: 220px;
    transition: all .5s ease;
    color: black;
    border: 3px solid black;
    font-family:'Montserrat', sans-serif;
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
`

const Img = styled.div`
display: relative;
width: 20px;
height: 100px;
`

export default Welcome;