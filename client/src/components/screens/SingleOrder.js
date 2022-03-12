import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const axios = require("axios");

function SingleOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/order/${id}`;
    try {
      const { data } = await axios.get(url, config);
      console.log(data)
      setOrder(data);
      setLoading(true)
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Fragment>
      {loading?(
      <Container           
      style={{
        padding: "2rem",
        justifyContent: "space-evenly"
      }}>
        <Row>
          <Col md={6}>
            <div>
              Price: {order.item.price}
            </div>
            <div>
              Quantity: {order.quantity}
            </div>
            <div>
              Payment mode: {order.paymode}
            </div>
          </Col>
          <Col md={6}>
          </Col>
          <Col sm={12}>
              Status: 
              <ProgressBar>
                <ProgressBar striped variant="danger" now={order.status=="Placed"? 33:0} key={1} />
                <ProgressBar variant="warning" now={order.status=="At distributor"? 33:0} key={2} />
                <ProgressBar striped variant="success" now={order.status=="Delivered"? 33:0} key={3} />
              </ProgressBar>
          </Col>
        </Row>
      </Container>

      ):(
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
        <ClipLoader color="#141850" size={70} />
      </div>
      )}
    </Fragment>
  );
}

export default SingleOrder;
