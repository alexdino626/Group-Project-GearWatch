import styled from "styled-components";
import { GiShoppingCart, GiHound, GiShoppingBag } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs"
import { useState, useEffect } from "react";
import { COLORS } from "./constants";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { FiHome } from "react-icons/fi";

const Header = () => {
  const [numItem, setNumItem] = useState(0);
  const [load, setLoad] = useState(false);
  const [item, setItem] = useState(0);

  // to get cart number
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/cart");
      const json = await data.json();
      setItem(json.data);
      setLoad(true);
      const num = item.reduce((sum, acc) => sum + acc.quantity, 0);
      setNumItem(num);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, [load]);

  // no need for a loading state for the header
  // if (load === false) {
  //   return <></>;
  // }

  return (
    <Bar>
      <StyledLink to={"/"}>
      <Title><GiHound /><Span>Gear Watch</Span></Title></StyledLink>
      <StyledLink to={"/product"}><Span><GiShoppingBag/> Products</Span></StyledLink>
      <StyledLink to={"/cart"}><Span>Checkout <BsCart4 /> {numItem > 0 && <strong>{numItem}</strong>}</Span>
      </StyledLink>
    </Bar>
  );
};

const Bar = styled.div`
  justify-content: space-around;
  font-family: 'Roboto Mono', monospace;
  font-size: 35px;
  display: flex;
  padding: 25px 35px;
  background-color: #0B0C10;
  border-bottom: outset 2px #1F2833;
`;

const Title = styled.div`
  padding-left: 10px;
  font-weight: bold;
`;


const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: hsl(0, 0%, 100%);;
  &:hover {
    color: hsl(209, 100%, 80%);
    transition: 0.5s;
  };
  &.active {
  color: hsl(195, 100%, 51%);
}`;



const Left= styled.div`
`;

const Span = styled.span`
  font-weight: bold;
`;

export default Header;
