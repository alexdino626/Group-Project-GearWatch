import { useEffect,useState } from "react"

const Confirm = () => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("/order-history/");
            const json = await data.json();
            console.log(json);

            setLoad(true);
      
            return json;
          };
          fetchData().catch(() => {
            console.log("S");
          });

    }, []);
return (
    <>Confirmed</>
)
}
export default Confirm