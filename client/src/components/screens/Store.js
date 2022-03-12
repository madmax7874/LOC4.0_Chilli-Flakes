import React, { Fragment, useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const axios = require("axios");
const Swal = require("sweetalert2");

function Store() {
  const navigate = useNavigate();

  const [store, getStore] = useState([]);
  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/private/store", config);
      getStore(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const orderConfirm = (item) => {
    Swal.fire({
      title: "Place order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const url = `/api/private/order`;
        try {
          const { data } = await axios.post(url, item, config);
          if (data.success) {
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const ItemComponents = store.map((item, index) => {
    return (
      <Card key={index} style={{ width: "18rem", margin: "1rem" }}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
        <Card.Body style={{ paddingBottom: "0.25rem" }}>
          <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
          <hr />
          <Row>
            <Col sm={12}>
              <Card.Text>Price: ₹{item.price}</Card.Text>
            </Col>
            <br />
            <br />
            <Col sm={12} style={{ textAlign: "center" }}>
              <Button
                variant="success"
                style={{ margin: "0.5rem" }}
                onClick={() => orderConfirm(item)}
              >
                Order Now
              </Button>
            </Col>
            <br />
            <br />
            <Col
              sm={12}
              style={{ color: "red", textAlign: "center", fontSize: "0.9rem" }}
            >
              <Card.Text>
                Only <b>{item.quantity}</b> left!!!
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Fragment>
      <Container>
        {localStorage.getItem("role") == "manufacturer" && (
          <div style={{ textAlign: "right", margin: "1rem" }}>
            <Button onClick={() => navigate("/store/add")}>Add Item</Button>
          </div>
        )}

        <div
          style={{
            padding: "1rem",
            textTransform: "capitalize",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {ItemComponents}
        </div>
      </Container>
    </Fragment>
  );
}

export default Store;
