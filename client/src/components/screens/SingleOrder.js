import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const axios = require("axios");

function convertURIToImageData(URI) {
  return new Promise(function(resolve, reject) {
    if (URI == null) return reject();
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        image = new Image();
    image.addEventListener('load', function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
}

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
      setOrder(data);
      setLoading(true)
    } catch (error) {
      console.log(error);
    }
  }, []);

  convertURIToImageData(order.qrcode).then(function(imageData) {
    setOrder((prevState) => ({
      ...prevState,
      qrcode: imageData,
    }));
  });

  const updatingStatus = async (id) => {
    const roler = localStorage.getItem('role')
    let mystatus;
    mystatus = roler=="manufacturer" ? "At distributor" : roler == "distributor" ? "Delivered" : "Placed"
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const url = `/api/private/order/${id}`;
    try {
      const { data } = await axios.put(url,{status:mystatus}, config);
      setOrder(data);
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Fragment>
      {loading ? (
      <Container           
      style={{
        padding: "2rem",
        justifyContent: "space-evenly"
      }}>
        <Row>
          <Col sm={12} style={{textAlign:'center'}}>
            <h2>Order id: {order._id}</h2>
          </Col>
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
            <Image src={order.qrcode }></Image>
          </Col>
          <Col sm={12}>
              Status: Order {order.status}
              <ProgressBar>
                <ProgressBar striped variant="danger" now={33} key={1} />
                <ProgressBar variant="warning" now={order.status!="Placed"? 33:0} key={2} />
                <ProgressBar striped variant="success" now={order.status=="Delivered"? 34:0} key={3} />
              </ProgressBar>
          </Col>
          {localStorage.getItem('role')!="consumer" && (
            <Col style={{margin:"1rem",textAlign:"center"}}>
              <Button onClick={()=>updatingStatus(order._id)} >
                Update Status
              </Button>
            </Col>
          )}
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
