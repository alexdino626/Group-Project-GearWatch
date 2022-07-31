import { useState } from "react";
import styled from "styled-components";
import { RiZzzFill } from "react-icons/ri";
import { ImSleepy } from "react-icons/im";
const Cart = () => {
  const [item, setItem] = useState(0);
  return (
    <>
      <Wrapper>
        <Div>Your cart:</Div>
        {item < 1 ? (
          <>
            <Empty>Looks like it's empty!</Empty>
            <Zz>
              <ImSleepy />
              <RiZzzFill />
            </Zz>
          </>
        ) : (
          <>Your Items</>
        )}
      </Wrapper>
    </>
  );
};
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
