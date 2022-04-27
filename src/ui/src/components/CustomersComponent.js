import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomersMap from "./CustomersMap";
import { CustomerContext } from "../Context/CustomerContext";

function CustomersComponent() {
  const { customer, setCustomer } = useContext(CustomerContext);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch("/customer");
      const body = await response.json();
      setCustomer(body);
      console.log(body);
    };

    // call the function
    fetchData()
      // catch any error
      .catch(console.error);
  }, []);
  return (
    <div>
      <h1 className="text-center"> Customers List</h1>
      <Table className="Table Table-striped">
        <thead>
          <tr>
            <td> Name</td>
            <td> Address Lines</td>
            <td> City</td>
            <td> County</td>
            <td> Postcode</td>
          </tr>
        </thead>
        <tbody>
          {customer.map((customer) => (
            <tr key={customer.id}>
              <td> {customer.name}</td>
              <td>
                <p style={{ maxWidth: "500px" }}>
                  {customer.line_1}
                  {customer.line_2 ? ", " + customer.line_2 : null}
                  {customer.line_3 ? ", " + customer.line_3 : null}
                </p>
              </td>
              <td> {customer.city}</td>
              <td> {customer.county}</td>
              <td> {customer.postcode}</td>
              <td>
                <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/customers/" + customer.id}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
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
        <Button color="success" tag={Link} to="/customers/new">
          Add Customer
        </Button>
        <Button color="success" onClick={() => setModalShow(true)}>
          Customers Map
        </Button>
      </div>
      <Modal isOpen={modalShow} style={{ size: "100%" }} size="lg">
        <ModalHeader toggle={() => setModalShow(false)}>
          Customers Map
        </ModalHeader>
        <ModalBody>
          <CustomersMap />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CustomersComponent;
