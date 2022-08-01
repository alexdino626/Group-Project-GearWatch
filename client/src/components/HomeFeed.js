// This is  pseudo code, i doubt any of this would work
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [slice, setSlice] = useState(16);
  // const [items, setItems] = useState({});
  // FETCHING all items
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/items");
      const json = await data.json();
      setItems(json.data);
      setLoad(true);
      setSlice(16);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return <>loading</>;
  }

  const handleClick = () => {
    if (slice < items.length) {
      setSlice(slice + 16);
    } else {
      window.scrollTo(0, 0);
      setSlice(16);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>Our wide selection of wearable goods:</Title>
        <Items>
          {items.slice(0, slice).map((x) => {
            return (
              <>
                <LinkItem to={`/item/${x._id}`}>
                  <Content>
                    <Name>{x.name}</Name>
                    <Img src={x.imageSrc} />
                    <Price>{x.price}</Price>
                  </Content>
                </LinkItem>
              </>
            );
          })}
        </Items>
        {slice < items.length ? (
          <Button onClick={handleClick}>Load more</Button>
        ) : (
          <Button onClick={handleClick}>Load less</Button>
        )}
      </Wrapper>
    </>
  );
};
const LinkItem = styled(Link)`
  color: black;
  text-decoration: none;
`;
const Button = styled.button`
  margin: 50px 375px;
  font-size: 25px;
  width: 150px;
  background-color: rgb(105, 84, 210);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  font-family: cursive;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin-bottom: 40px;
  padding-bottom: 5px;
  padding-right: 15px;
`;
const Items = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 800px;
  flex-wrap: wrap;
`;
const Img = styled.img`
  height: 140px;
  width: 140px;
  border: solid 1px;
`;
const Content = styled.div`
  border: solid 2px;
  width: 175px;
  padding: 15px;
`;
const Name = styled.div`
  height: 55px;
  margin-bottom: 10px;
`;
const Price = styled.div`
  border-top: solid 1px;
  margin-top: 5px;
  padding-top: 5px;
`;

export default HomePage;
