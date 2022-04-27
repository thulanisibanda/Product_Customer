import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <Button
        size="lg"
        color="link"
        style={{
          margin: 20,
          marginTop: "10%",
        }}
      >
        <Link to="/products">Products</Link>
      </Button>
      <br />
      <Button
        size="lg"
        color="link"
        style={{
          margin: 20,
        }}
      >
        <Link to="/customers">Customers</Link>
      </Button>
    </div>
  );
}
export default Home;
