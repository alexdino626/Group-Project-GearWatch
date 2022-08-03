import { FaCcVisa, FaCcAmex, FaUserAlt, FaEnvelope, FaRegAddressCard, FaCcMastercard, FaCcDiscover } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [addy, setAddy] = useState("");
  const [pay, setPay] = useState("");
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/cart");
      const json = await data.json();
      console.log(json.data);
      setCart(json.data)
      setLoad(true);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/purchase", {
        method: "POST",
        body: JSON.stringify({
          itemList: cart,
          cardNumber: pay,
          address:addy,
          firstName:name,
          lastName:lastName

        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      
        .then((res) => res.json())
        .then((data) => 
{        console.log(data)
        window.location.href = "/confirmed"})

  };
  console.log(name);
  console.log(lastName);
  console.log(email);
  console.log(addy);
  console.log(pay.length);

  return (
      <Wrapper>
      <Title>Billing Address</Title>
      <form onSubmit={(event) => handleSubmit(event)}>

      <Name><FaUserAlt /> First Name</Name>
      <input size="30" placeholder="Name" onChange={(event) => { setName(event.target.value);}} />

      <Name><FaUserAlt /> Last Name</Name>
      <input size="30" placeholder="Last Name" type={"adre"} onChange={(event) => { setLastName(event.target.value);}}/>
        
      <Name><FaEnvelope /> Email</Name>
      <input size="30" type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value);}}/>
        
      <Name><FaRegAddressCard /> Address</Name>
      <input size="30" placeholder="Address" onChange={(event) => { setAddy(event.target.value);}}/>
        
      <Title>Payment</Title>

      <Name>Accepted Cards</Name>
      <Cards> <FaCcVisa fill="navy" /> <FaCcAmex fill="blue" /> <FaCcMastercard fill="red" /> <FaCcDiscover fill="orange"/></Cards>

      <Name>Credit Card</Name>
      <Input><input size="30" placeholder="Credit card number" onChange={(event) => {setPay(event.target.value);}}/></Input>

      <Button><button type={"submit"} disabled={name === "" || lastName === "" || email === "" || addy === "" || pay === ""}> Place Order </button></Button>
      </form>
      </Wrapper>
  );
};


const Wrapper = styled.div`
  box-shadow: 3px 10px 10px -2px rgba(0,0,0,0.7);
  -webkit-box-shadow: 3px 10px 10px -2px rgba(0,0,0,0.7);
  -moz-box-shadow: 3px 10px 10px -2px rgba(0,0,0,0.7);
  text-align: center;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 150px;
  margin-left: 480px;
  margin-bottom: 500px;
  font-family: 'Roboto Mono', monospace;
  border: solid 1px lightgrey;
  background-color: hsl(0, 0%, 98%);
`

const Title = styled.div`
padding-top: 20px;
font-size: 25px;
font-weight: bold;
`

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

const Button = styled.div`
padding-top: 35px;
`

const Row = styled.div`
flex-direction: column;
`

const Input = styled.div`

`;


export default Checkout;
