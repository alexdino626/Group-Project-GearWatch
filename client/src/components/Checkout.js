import {
  FaCcVisa,
  FaCcAmex,
  FaUserAlt,
  FaEnvelope,
  FaRegAddressCard,
  FaCcMastercard,
  FaCcDiscover,
} from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [addy, setAddy] = useState("");
  const [pay, setPay] = useState("");
  const [cart, setCart] = useState(null);

  //this will get the final cart details
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/cart");
      const json = await data.json();
      setCart(json.data);
      setLoad(true);
      return json;
    };
    fetchData().catch((err) => {
      throw new Error(err);
    });
  }, []);

  // this handle the POST which deletes the cart and adds it to the orderHistory
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/purchase", {
      method: "POST",
      body: JSON.stringify({
        itemList: cart,
        cardNumber: pay,
        address: addy,
        firstName: name,
        lastName: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          alert(data.message);
        } else {
          window.location.href = "/confirmed";
        }
      });
  };

  return (
    <Wrapper>
      <Title>Billing Address</Title>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Name>
          <FaUserAlt /> First Name
        </Name>
        <input
          size="30"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <Name>
          <FaUserAlt /> Last Name
        </Name>
        <input
          size="30"
          placeholder="Last Name"
          type={"adre"}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />

        <Name>
          <FaEnvelope /> Email
        </Name>
        <input
          size="30"
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <Name>
          <FaRegAddressCard /> Address
        </Name>
        <input
          size="30"
          placeholder="Address"
          onChange={(event) => {
            setAddy(event.target.value);
          }}
        />

        <Title>Payment</Title>

        <Name>Accepted Cards</Name>
        <Cards>
          {" "}
          <FaCcVisa fill="navy" /> <FaCcAmex fill="blue" />{" "}
          <FaCcMastercard fill="red" /> <FaCcDiscover fill="orange" />
        </Cards>

        <Name>Credit Card</Name>
        <Input>
          <input
            size="30"
            placeholder="Credit card number"
            onChange={(event) => {
              setPay(event.target.value);
            }}
          />
        </Input>

        <Button
          type={"submit"}
          disabled={
            name === "" ||
            lastName === "" ||
            email === "" ||
            addy === "" ||
            pay === ""
          }
        >
          {" "}
          Place Order{" "}
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-left: 100px;
  padding-right: 100px;
  font-family: "Roboto Mono", monospace;
`;

const Title = styled.div`
  padding-top: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const Name = styled.div`
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 15px;
`;

const Cards = styled.span`
  padding: 7px 0;
  font-size: 25px;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 50px;
  position: absolute;
  text-decoration: none;
  transition: all 0.5s ease;
  color: black;
  margin-left: -99px;
  border: 3px solid black;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  font-size: 25px;
  background-color: transparent;
  padding: 5px;
  outline: none;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

const Row = styled.div`
  flex-direction: column;
`;

const Input = styled.div``;

export default Checkout;
