import React, { Component, createRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";

const PostcodeLookupComponent = (props) => {
  const context = createRef();

  useEffect(() => {
    PostcodeLookup.setup({
      apiKey: "ak_l16pa71aT9i0hCgGoJTa9lSKIKrYe",
      context: context.current,
      buttonStyle: {
        backgroundColor: "green",
        color: "white",
      },
      ...props,
    });
  }, []);

  return <div ref={context}></div>;
};

class CustomerEdit extends Component {
  customer = {
    line_1: "",
    line_2: "",
    line_3: "",
    street: "",
    city: "",
    county: "",
    postcode: "",
    lat: 0.0,
    lon: 0.0,
    name: "",
    id: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      customer: this.customer,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const customer = await (
        await fetch(`/customer/${this.props.match.params.id}`)
      ).json();
      this.setState({ customer: customer });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let customer = { ...this.state.customer };
    customer[name] = value;
    this.setState({ customer });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { customer } = this.state;

    await fetch("/customer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    this.props.history.push("/customers");
  }

  render() {
    const { customer } = this.state;
    const setAddress = (res) => {
      let customer = { ...this.state.customer };
      (customer.line_1 = res.line_1),
        (customer.line_2 = res.line_2),
        (customer.line_3 = res.line_3),
        (customer.street = res.thoroughfare),
        (customer.city = res.post_town),
        (customer.county = res.postal_county),
        (customer.postcode = res.postcode),
        (customer.lat = String(res.latitude)),
        (customer.lon = String(res.longitude)),
        this.setState({ customer });
    };

    return (
      <div style={{ marginTop: 20 }}>
        <Form
          onSubmit={this.handleSubmit}
          style={{ width: 400, marginTop: 20, marginLeft: 20 }}
        >
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              value={customer.name || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <PostcodeLookupComponent
            onAddressSelected={(address) => setAddress(address)}
          />
          <FormGroup>
            <Label style={{ marginTop: 10 }} for="line_1">
              Address Line 1
            </Label>
            <Input
              type="line_1"
              name="line_1"
              id="line_1"
              value={customer.line_1 || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="line_2">Address Line 2</Label>
            <Input
              type="line_2"
              name="line_2"
              id="line_2"
              value={customer.line_2 || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="line_3">Address Line 3</Label>
            <Input
              type="line_3"
              name="line_3"
              id="line_3"
              value={customer.line_3 || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="street">Street</Label>
            <Input
              type="street"
              name="street"
              id="street"
              value={customer.street || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="city"
              name="city"
              id="city"
              value={customer.city || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="county">County</Label>
            <Input
              type="county"
              name="county"
              id="county"
              value={customer.county || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="postcode">Postcode</Label>
            <Input
              type="postcode"
              name="postcode"
              id="postcode"
              value={customer.postcode || ""}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/customers">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default withRouter(CustomerEdit);
