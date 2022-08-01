// This is  pseudo code, i doubt any of this would work
import React from "react";
import styled from "styled-components";
import { useState, useEffect, useHistory } from "react";

const HomePage = () => {
const [items, setItems] = useState([]);
// const [items, setItems] = useState({});

// clicking on a product brings you to a specific item
// const ProductItem = ({}) => {
// const history = useHistory()
// function handleClick(event) {
//     ev.preventDefault();
//     history.push("/item/:itemId");
// }

// FETCHING all items
useEffect(() => {
    fetch("/items")
    // fetch("api/items")
    .then((response) => response.json())
    .then((data) => {
        setItems(data.items);
        console.log(data.items);
    })
    .catch((error) => (console.log(error)));
}, []);

// returning all items
{items.map((data) => {
return (
    <>
    {/* <ProductItem src={items.imageSrc} onClick={handleClick}/> */}
    {/* <ClickWrapper onClick= {event => {history.push("/item/:itemId")}}> */}
    <Items key={data.items} value={data.items}></Items>
    {/* </ClickWrapper> */}
    </>
)})
};
}
// }

// const ProductItem = styled.img`
// cursor: pointer;
// width: 100%;
// border-radius: 50%;
// `;

// const ClickWrapper = styled.div`
//   width: 580px;
// `;

const Items = styled.div`
    display: flex;
    flex-direction: column;
`;

export default HomePage;
