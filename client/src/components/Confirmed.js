import { useEffect, useState } from "react";
import styled from "styled-components";

const Confirm = () => {
  const [load, setLoad] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/order-history/");
      const json = await data.json();
      console.log(json.data);
      setLastOrder(json.data);
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
  const con = lastOrder[lastOrder.length - 1];
  return (
    <div>
      <div>
        Congrats! Your order has been confirmed {con.firstName} {con.lastName}!!
      </div>
      <div>Your confirmation #{con.orderNumber}</div>
      <div>
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
      </div>
    </div>
  );
};
const Content = styled.div`
  margin-top: 40px;
  border: solid;
  padding: 15px;
`;
const Desc = styled.div``;
const Img = styled.img`
  height: 75px;
  border: solid;
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
export default Confirm;
