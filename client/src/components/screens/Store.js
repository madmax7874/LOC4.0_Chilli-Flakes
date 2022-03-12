import React, { Fragment, useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const axios = require("axios");

function Store() {
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

  const ItemComponents = store.map((item, index) => {
    return (
      <Card key={index} style={{ width: "18rem", margin: "1rem" }}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
          <hr />
          <Row>
            <Col sm={12}>
              <Card.Text>Price: ₹{item.price}</Card.Text>
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
            <Button>
              <Link to="/store/add">Add</Link>
            </Button>
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
