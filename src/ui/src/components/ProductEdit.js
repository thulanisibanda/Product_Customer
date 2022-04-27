import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function ProductEdit(props) {
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (props.match.params.id !== "new") {
        const product = await (
          await fetch(`/product/${props.match.params.id}`)
        ).json();
        console.log(product);
        setSku(product.sku);
        setPrice(product.price);
        setDescription(product.description);
      }
    };

    // call the function
    fetchData()
      // catch any error
      .catch(console.error);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.match.params.id,
        sku,
        price: String(price),
        description,
      }),
    });
    props.history.push("/products");
  };

  return (
    <div>
      <h2>{props.match.params.id != "new" ? "Edit Product" : "Add Product"}</h2>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="sku">SKU</Label>
            <Input
              type="text"
              name="sku"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              autoComplete="sku"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoComplete="description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="description"
              maxLength={255}
              placeholder={"255 Max Characters"}
              rows={4}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/products">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default withRouter(ProductEdit);
