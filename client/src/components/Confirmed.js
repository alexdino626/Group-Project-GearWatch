import { useEffect, useState } from "react";
import { COLORS } from "./constants";
import { GiHound } from "react-icons/gi";
import styled from "styled-components";

const Confirm = () => {
  const [load, setLoad] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/order-history/");
      const json = await data.json();

      setLastOrder(json.data);
      setLoad(true);

      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return (
      <>
        <Loading>Loading</Loading>
      </>
    );
  }
  const con = lastOrder[lastOrder.length - 1];
  return (
    <Wrapper>
      <Mascot>
        <GiHound />
      </Mascot>
      <Confirmation>Thank You!</Confirmation>
      <ConfirmationText>
        Your order has been confirmed{" "}
        <strong>
          {con.firstName} {con.lastName}!
        </strong>
      </ConfirmationText>
      <ConfirmationText>
        Your confirmation <strong>#{con.orderNumber}</strong>
      </ConfirmationText>

      {con.orderedItems.map((x) => {
        const float = x.price.substring(1);
        return (
          <>
            <Content>
              <DivDesc>
                <Img src={x.imageSrc} />
                <Desc>
                  <div>{x.name}</div>
                  <Update>QTY:{x.quantity}</Update>
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
      <ComeAgain>
        Hope to see you again <strong>{con.firstName}! 😊</strong>
      </ComeAgain>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  text-align: center;
  font-family: "Roboto Mono", monospace;
  margin-top: 50px;
  margin-left: 140px;
`;

const Content = styled.div`
  margin-top: 40px;
  padding: 15px;
`;

const Desc = styled.div``;

const Img = styled.img`
  height: 75px;
  padding: 5px;
  margin-right: 5px;
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

const Update = styled.div`
  font-size: 23px;
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const Confirmation = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 45px;
  font-weight: bold;
`;

const ConfirmationText = styled.div`
  font-size: 20px;
`;

const Mascot = styled.div`
  padding-top: 20px;
  font-size: 45px;
`;

const ComeAgain = styled.div`
  font-size: 20px;
  padding-top: 50px;
  padding-bottom: 80px;
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

export default Confirm;
