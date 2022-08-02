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
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          placeholder="Last Name"
          type={"adre"}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          placeholder="Address"
          onChange={(event) => {
            setAddy(event.target.value);
          }}
        />
        <input
          placeholder="Credit card number"
          onChange={(event) => {
            setPay(event.target.value);
          }}
        />
        <button
          type={"submit"}
          disabled={
            name === "" ||
            lastName === "" ||
            email === "" ||
            addy === "" ||
            pay === ""
          }
        >
          Place Order
        </button>
      </form>
    </div>
  );
};
export default Checkout;
