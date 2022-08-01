import { useState, useEffect } from "react";
import styled from "styled-components";
import { RiZzzFill } from "react-icons/ri";
import { ImSleepy } from "react-icons/im";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

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
    return <>loading</>;
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
        <Div>Your cart:</Div>
        {item === undefined ? (
          <>
            <Empty>Looks like it's empty!</Empty>
            <Zz>
              <ImSleepy />
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
  font-family: cursive;
  border-radius: 15px;
  color: white;
  background-color: rgb(105, 84, 210);
  &:hover {
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
const Desc = styled.div``;
const Img = styled.img`
  height: 75px;
  border: solid;
  padding: 5px;
  margin-right: 5px;
`;
const Content = styled.div`
  margin-top: 40px;
  border: solid;
  padding: 15px;
`;
const Wrapper = styled.div`
  font-family: cursive;
  margin-top: 30px;
  margin-left: 20px;
`;
const Div = styled.div`
  font-size: 30px;
  font-weight: bolder;
  border-bottom: solid 5px;
  width: fit-content;
  padding-right: 90px;
  padding-bottom: 10px;
`;
const Empty = styled.div`
  margin-top: 30px;
  font-size: 50px;
`;
const Zz = styled.div`
  margin-top: 50px;
  font-size: 75px;
  text-align: center;
`;
export default Cart;
