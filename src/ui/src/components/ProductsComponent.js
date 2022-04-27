import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";

function ProductsComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch("/product");
      const body = await response.json();
      setProducts(body);
    };

    // call the function
    fetchData()
      // catch any error
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-center"> Products List</h1>
      <Table className="Table Table-striped">
        <thead>
          <tr>
            <td> Product Id</td>
            <td> Product SKU</td>
            <td> Product Price</td>
            <td> Product Description</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td> {product.id}</td>
              <td> {product.sku}</td>
              <td> {product.price}</td>
              <td>
                <p style={{ maxWidth: "700px" }}>{product.description} </p>
              </td>
              <td>
                <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/products/" + product.id}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button color="success" tag={Link} to="">
          Home
        </Button>
        <Button color="success" tag={Link} to="/products/new">
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default ProductsComponent;
