import styled from "styled-components";
import { GiShoppingCart } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [numItem, setNumItem] = useState(0);

  // to get cart number it will be moved to context file
  useEffect(() => {}, []);

  return (
    <Bar>
      <StyledLink to={"/"}>
        <Title>Buy-A-Wear</Title>
      </StyledLink>
      <StyledLink to={"/"}>
        <FiHome />
      </StyledLink>
      <StyledLink to={"/cart"}>
        <Cart>
          <GiShoppingCart />
          {numItem > 0 && <span>{numItem}</span>}
        </Cart>
      </StyledLink>
    </Bar>
  );
};
const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(105, 84, 210);
  font-size: 35px;
  font-family: cursive;
  padding: 20px 15px;
  color: white;
`;
const Title = styled.div`
  font-weight: bolder;
`;
const Cart = styled.div`
  display: flex;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
export default Header;