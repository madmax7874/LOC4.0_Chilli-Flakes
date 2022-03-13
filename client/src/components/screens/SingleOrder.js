import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAlert } from "react-alert";

const axios = require("axios");

function convertURIToImageData(URI) {
  return new Promise(function (resolve, reject) {
    if (URI == null) return reject();
    var canvas = document.createElement("canvas"),
      context = canvas.getContext("2d"),
      image = new Image();
    image.addEventListener(
      "load",
      function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      },
      false
    );
    image.src = URI;
  });
}

function SingleOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

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
      setOrder(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const RenderButton = () => {
    const role = localStorage.getItem("role");
    if (
      (order.status == "At distributor" && role == "distributor") ||
      (order.status == "Placed" && role == "manufacturer")
    ) {
      return (
        <Col sm={12} md={2} style={{ margin: "1rem" }}>
          <Button onClick={() => updatingStatus(order._id)}>
            Update Status
          </Button>
        </Col>
      );
    }
    return null;
  };

  convertURIToImageData(order.qrcode).then(function (imageData) {
    setOrder((prevState) => ({
      ...prevState,
      qrcode: imageData,
    }));
  });

  const updatingStatus = async (id) => {
    const roler = localStorage.getItem("role");
    let mystatus;
    mystatus =
      roler == "manufacturer"
        ? "At distributor"
        : roler == "distributor"
        ? "Delivered"
        : "Placed";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/order/${id}`;
    try {
      const { data } = await axios.put(url, { status: mystatus }, config);
      setOrder((prevState) => ({
        ...prevState,
        status: mystatus,
      }));
      alert.show("Item Added", { type: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Container
          style={{
            padding: "2rem",
            justifyContent: "space-evenly",
          }}
        >
          <Card>
            <Card.Header as="h3">Order id: {order._id}</Card.Header>
            <Card.Body>
              <Row justifyContent>
                <Col sm={12} md={2}>
                  <Image src={order.qrcode}></Image>
                </Col>
                <Col sm={6}>
                  <h4 style={{ paddingTop: "1rem" }}>
                    Price: {order.item.price}
                  </h4>
                  <h4>Quantity: {order.quantity}</h4>
                  <h4>Payment mode: {order.paymode}</h4>
                </Col>
              </Row>
              <Card.Title>
                <Col sm={12}>
                  <ProgressBar>
                    <ProgressBar striped variant="danger" now={33} key={1} />
                    <ProgressBar
                      variant="warning"
                      now={order.status != "Placed" ? 33 : 0}
                      key={2}
                    />
                    <ProgressBar
                      striped
                      variant="success"
                      now={order.status == "Delivered" ? 34 : 0}
                      key={3}
                    />
                  </ProgressBar>
                </Col>
                <Row>
                  <Col sm={12} md={4} style={{ margin: "1rem" }}>
                    <h5>Status: Order {order.status}</h5>
                  </Col>
                  <Col sm={12} md={5}></Col>
                  <RenderButton />
                </Row>
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <ClipLoader color="#141850" size={70} />
        </div>
      )}
    </>
  );
}

export default SingleOrder;
