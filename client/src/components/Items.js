import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Items = () => {
  const [item, setItem] = useState(null);
  const [load, setLoad] = useState(false);
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
  if (load === false) {
    return <>loading</>;
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
        quantity:count
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = "/cart";
      });

  }

  return (
    <>
      <All>
        <Wrapper>
          <Cat>{item.category}</Cat>
          <div>For the {item.body_location}</div>
          <Name>{item.name}</Name>
          <div>by {item.companyId}</div>
        </Wrapper>
        <Item>
          <Img src={item.imageSrc} />
          <Order>
            <Price>{item.price}</Price>
            {item.numInStock <= 3 && item.numInStock>0 && <div>LOW IN STOCK!!!</div>}
            {item.numInStock < 1 ?<>OUT OF STOCK</>: <Stock>
              <Button disabled={count === 1} onClick={handleClickMinus}>
                -
              </Button>
              <div>{count}</div>
              <Button onClick={handleClickPlus}>+</Button>
            </Stock>}
           {item.numInStock > 0 &&<AddBut onClick={handleAddCart}>Add to cart</AddBut> }
            
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
  background-color: rgb(105, 84, 210);
  color: white;
&:hover{
    cursor: pointer;
}
`
const Button = styled.button`
  margin: 15px;
  font-size: 25px;
  padding: 15px;
  border-radius: 25px;
  border: none;
  background-color: rgb(105, 84, 210);
  color: white;
  &:hover:not([disabled]) {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: hsla(258, 100%, 86%, 1);
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
  border: solid lightgrey;
  padding: 10px;
`;
const Item = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 90px;
`;
const Name = styled.div`
  margin-top: 20px;
  font-size: 50px;
  margin-bottom: 10px;
`;
const Wrapper = styled.div``;
const All = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  font-family: cursive;
`;
const Cat = styled.div`
  color: lightgray;
  font-size: 45px;
  border-bottom: solid lightgrey;
  margin-bottom: 5px;
`;
export default Items;
