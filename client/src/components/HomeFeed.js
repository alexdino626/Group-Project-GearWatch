// This is  pseudo code, i doubt any of this would work
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "./constants";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [slice, setSlice] = useState(24);

  // FETCHING all items
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/items");
      const json = await data.json();
      setItems(json.data);
      setLoad(true);
      setSlice(24);
      console.log(json);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return <Loading>loading</Loading>;
  }

  const handleClick = () => {
    if (slice < items.length) {
      setSlice(slice + 24);
    } else {
      window.scrollTo(0, 308);
      setSlice(308);
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
                    <Stock>
                      {x.numInStock} In stock
                      <LowStock>
                        {x.numInStock <= 3 && x.numInStock > 0 && (
                          <div>LOW IN STOCK!!!</div>
                        )}
                      </LowStock>
                      <OutStock>
                        {x.numInStock >= 0 && x.numInStock < 1 && (
                          <div>OUT OF STOCK!!!</div>
                        )}
                      </OutStock>
                    </Stock>
                  </Content>
                </LinkItem>
              </>
            );
          })}
        </Items>
        {slice < items.length ? (
          <Button onClick={handleClick}>Load more</Button>
        ) : (
          <Button onClick={handleClick}>Go back at top</Button>
        )}
      </Wrapper>
    </>
  );
};

const LowStock = styled.div`
  color: ${COLORS.low};
`;

const OutStock = styled.div`
  color: ${COLORS.out};
`;

const Wrapper = styled.div`
  font-family: "Roboto Mono", monospace;
  margin-top: 30px;
  margin-left: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  font-style: italic;
  font-size: 25px;
  padding-bottom: 40px;
  padding-right: 15px;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 1300px;
  flex-wrap: wrap;
`;

const LinkItem = styled(Link)`
  box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 10px 10px -2px rgba(0, 0, 0, 0.7);
  border: solid 1px lightgrey;
  border-radius: 20px;
  background-color: light;
  width: 200px;
  height: 400px;
  color: ${COLORS.text};
  text-decoration: none;
`;

const Content = styled.div`
  width: 175px;
  padding: 15px;
`;

const Stock = styled.div`
  margin-top: 5px;
  padding-bottom: 10px;
`;

const Button = styled.button`
  margin: 50px 575px;
  font-size: 25px;
  width: 200px;
  background-color: #38a0e0;
  color: white;
  border: outset 5px #1c77b0;
  padding: 20px;
  border-radius: 20px;
  &:hover {
    background-color: #7bc0ea;
    border: outset 5px #4faae3;
    cursor: pointer;
  }
`;

const Img = styled.img`
  height: 150px;
  width: 140px;
`;

const Name = styled.div`
  white-space: wrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 0px solid #000000;
  height: 95px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-weight: bold;
  margin-top: 5px;
  padding-top: 5px;
`;

const Loading = styled.div`
  font-family: "Roboto Mono", monospace;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-size: 20px;
  color: ${COLORS.shadowColour};
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px ${COLORS.shadowColour};
  box-shadow: 0 0 20px ${COLORS.shadowColour};

  &:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid ${COLORS.borderColour};
    border-right: 3px solid ${COLORS.borderColour};
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }

  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;

export default HomePage;
