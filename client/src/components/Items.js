import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";

const Items = () => {
  const [item, setItem] = useState(null);
  const [load, setLoad] = useState(false);
  const [comp, setComp] = useState(null);
  const [loadComp, setLoadComp] = useState(false);
  const [count, setCount] = useState(1);

  const value = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/item/${value.item}`);
      const json = await data.json();
      setItem(json.data);
      setLoad(true);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/companies`);
      const json = await data.json();

      setComp(json.data);
      setLoadComp(true);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return <Loading>Loading</Loading>;
  }
  if (loadComp === false) {
    return <Loading></Loading>;
  }
  const handleClickPlus = () => {
    setCount(count + 1);
  };
  const handleClickMinus = () => {
    setCount(count - 1);
  };
  const handleAddCart = () => {
    fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
        ...item,
        quantity: count,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        window.location.href = "/cart";
      });
  };

  return (
    <>
      <All>
        <Wrapper>
          <Cat>
            {item.category} <Span>For the {item.body_location}</Span>
          </Cat>
          <Name>{item.name}</Name>
          <Company>
            by {comp.filter((x) => x._id === item.companyId)[0].name}
          </Company>
        </Wrapper>
        <Item>
          <Img src={item.imageSrc} />
          <Order>
            <Price>{item.price}</Price>
            {item.numInStock <= 3 && item.numInStock > 0 && (
              <div>LOW IN STOCK!!!</div>
            )}
            {item.numInStock < 1 ? (
              <>OUT OF STOCK</>
            ) : (
              <Stock>
                <Button disabled={count === 1} onClick={handleClickMinus}>
                  -
                </Button>
                <div>{count}</div>
                <Button onClick={handleClickPlus}>+</Button>
              </Stock>
            )}
            {item.numInStock > 0 && (
              <AddBut onClick={handleAddCart}>Add to cart</AddBut>
            )}
          </Order>
        </Item>
      </All>
    </>
  );
};

const AddBut = styled.button`
  font-size: 25px;
  margin: 15px;
  font-size: 25px;
  padding: 15px;
  border-radius: 25px;
  border: none;
  background-color: ${COLORS.button};
  color: white;
  &:hover {
    background-color: #a6d4f2;
    cursor: pointer;
  }
`;

const Button = styled.button`
  margin: 15px;
  font-size: 25px;
  padding: 15px;
  border-radius: 25px;
  border: none;
  background-color: ${COLORS.button};
  color: white;
  &:hover:not([disabled]) {
    background-color: #a6d4f2;
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #a6d4f2;
    border-color: hsla(258, 100%, 86%);
  }
`;

const Stock = styled.div`
  display: flex;
  margin: 15px;
  font-size: 45px;
  align-items: center;
`;

const Order = styled.div`
  margin-left: 15px;
`;

const Price = styled.div`
  font-size: 50px;
  margin-bottom: 15px;
`;

const Img = styled.img`
  height: 350px;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 90px;
`;

const Company = styled.div`
  font-size: 20px;
  font-style: italic;
`;

const Name = styled.div`
  margin-top: 40px;
  font-size: 45px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div``;

const All = styled.div`
  font-family: "Roboto Mono", monospace;
  margin-top: 30px;
  margin-left: 20px;
`;

const Span = styled.span`
  font-style: italic;
  font-size: 25px;
`;

const Cat = styled.div`
  font-size: 45px;
  border-bottom: solid ${COLORS.solidborder};
  margin-bottom: 5px;
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

export default Items;
