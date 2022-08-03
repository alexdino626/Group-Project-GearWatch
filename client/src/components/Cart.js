import { useState, useEffect } from "react";
import styled from "styled-components";
import { RiZzzFill } from "react-icons/ri";
import { GiHound } from "react-icons/gi";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { COLORS } from "./constants";

const Cart = () => {
  const [item, setItem] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/cart");
      const json = await data.json();
      console.log(json.data);
      setItem(json.data);
      setLoad(true);

      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return <><Loading>Loading</Loading></>;
  }

  const handleDelete = (id) => {
    console.log(id);
    console.log("click");
    fetch("/cart", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = "/cart";
      });
  };
  const handleClickPlus = (max, id) => {
    fetch("/cart", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: max + 1,
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = "/cart";
      });
  };
  const handleClickMinus = (min, id) => {
    console.log(min);
    console.log(id);
    fetch("/cart", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: min - 1,
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = "/cart";
      });
  };

  return (
    <>
      <Wrapper>
        <Div>Cart:</Div>
        {item === undefined ? (
          <>
            <Empty>No items in cart</Empty>
            <Zz>
              <GiHound />
              <RiZzzFill />
            </Zz>
          </>
        ) : (
          <>
            {item.map((x) => {
              const float = x.price.substring(1);
              return (
                <>
                  <Content>
                    <DivDesc>
                      <Img src={x.imageSrc} />
                      <Desc>
                        <div>{x.name}</div>
                        <Update>
                          <Minus
                            style={x.quantity === 1 && { display: "none" }}
                            onClick={() => handleClickMinus(x.quantity, x._id)}
                          />
                          {x.quantity}
                          <Plus
                            onClick={() => handleClickPlus(x.quantity, x._id)}
                          />
                        </Update>
                        <Trash onClick={() => handleDelete(x._id)} />
                      </Desc>
                    </DivDesc>
                    <Price>
                      <div>Product Total</div>
                      <div>${(parseFloat(float) * x.quantity).toFixed(2)}</div>
                    </Price>
                  </Content>
                </>
              );
            })}
            <Link to={"/checkout"}>
              {" "}
              <Checkout>Checkout</Checkout>
            </Link>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Checkout = styled.button`
  margin: 50px;
  padding: 15px;
  font-size: 30px;
  border-radius: 15px;
  color: white;
  background-color: ${COLORS.button};
  &:hover {
    background-color: ${COLORS.bhovering};
    cursor: pointer;
  }
`;

const Update = styled.div`
  font-size: 23px;
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const Plus = styled(BsFillPlusCircleFill)`
  &:hover {
    cursor: pointer;
  }
`;

const Minus = styled(AiFillMinusCircle)`
  &:hover {
    cursor: pointer;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  border-top: solid;
  padding-top: 5px;
`;

const DivDesc = styled.div`
  display: flex;
`;

const Trash = styled(BsTrash)`
  margin-top: 15px;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const Desc = styled.div`
`;

const Img = styled.img`
  height: 75px;
  padding: 5px;
  margin-right: 5px;
`;

const Content = styled.div`
  margin-top: 40px;
  padding: 15px;
`;

const Wrapper = styled.div`
  font-family: 'Roboto Mono', monospace;
  margin-top: 30px;
  margin-left: 20px;
`;

const Div = styled.div`
  font-size: 45px;
  font-weight: bold;
  border-bottom: solid 5px;
  width: fit-content;
  padding-right: 90px;
  padding-bottom: 10px;
`;

const Empty = styled.div`
  margin-top: 30px;
  font-size: 45px;
  font-style: italic;
  font-weight: bold;
`;

const Zz = styled.div`
  margin-left: 500px;
  margin-top: 150px;
  font-size: 200px;
  flex-direction: column;
  text-align: center;
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

export default Cart;
