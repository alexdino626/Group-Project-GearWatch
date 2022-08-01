import { useEffect,useState } from "react"

const Checkout = () => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("/cart");
            const json = await data.json();
            console.log(json.data);
            setLoad(true);
            return json;
          };
          fetchData().catch(() => {
            console.log("S");
          });

    }, []);

    const handleSubmit = (event) =>{
        event.preventDefault();
    }
return (
    <div>
        <form onSubmit={(event) => handleSubmit(event)}>
            <input placeholder="Name"/>
            <input placeholder="Last Name"/>
            <input placeholder="Email"/>
            <input placeholder="Address"/>
            <input placeholder="Credit card number"/>
            <button type={"submit"}>Place Order</button>
        </form>
    </div>
)
}
export default Checkout