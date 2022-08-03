import styled from "styled-components";
import { GiShoppingCart, GiHound } from "react-icons/gi";
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
        <Title>
          <GiHound />
          <Span>Gear Watch</Span>
        </Title>
      </StyledLink>
      <StyledLink to={"/"}>
        <Span>Products</Span>
      </StyledLink>
      <StyledLink to={"/cart"}>
        <Cart>
          <Padding>Checkout</Padding>
          <GiShoppingCart />
          {numItem > 0 && <span>{numItem}</span>}
        </Cart>
      </StyledLink>
    </Bar>
  );
};

const Bar = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
  padding: 25px 35px;
  background-color: #0B0C10;
  border-bottom: outset 2px #1F2833;
`;

const Title = styled.div`
  padding-left: 10px;
  font-weight: bold;
  display: flex;
`;

const Cart = styled.div`
  display: flex;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #C5C6C7;
  &:hover {
    color: #45A29E;
    transition: 0.5s;
  };
  &.active {
  color: #A0D1F0;
};
`;

const Padding = styled.span`
  padding-right: 10px;
`;

const Span = styled.span`
  margin-left: 10px;
`;

export default Header;
