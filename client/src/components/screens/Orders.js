import React, { Fragment, useEffect, useState } from "react";
import {Container, Table, Button} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const axios = require("axios");

function Orders() {

    const [orders,setOrders]=useState([])
  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/private/orders", config);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ordersComponent = orders.map((order, index) => {
    return (
      <tr key={index} index={index} >
        <td>{order._id}</td>
        <td>{order.item.name}</td>
        {/* <td>{order.item.price}</td>
        <td>{order.quantity}</td> */}
        <Button style={{fontWeight:"bold", color:"#A15447 ",padding: "0.375rem 0.5rem",background:"inherit", marginRight:'0px'}}>
          <Link to={`/orders/${order._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </Link>
        </Button>
        {/* <td style={{color : order.status=="Placed" ? "red" : order.status=="On the way" ? "yellow" : "green"}}>{order.status}</td> */}
      </tr>
    );
  });


  return (
    <Fragment>
      <Container>
        <div
          style={{
            padding: "1rem",
            textTransform: "capitalize",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
        </div>
        <Table className="table table-hover" style={{ textTransform:"capitalize" }} >
            <thead style={{fontSize:"1.2rem", color:"#141850"}}>
            <tr>
                <th>OrderID</th>
                <th>Item</th>
                <th>View</th>
                {/* <th>Price(₹)</th>
                <th>Quantity</th>
                <th>Status</th> */}
            </tr>
            </thead>
            <tbody style={{ fontFamily: 'Sans-serif'}}>
              {ordersComponent}
            </tbody>
      </Table>
    </Container>
    </Fragment>
  );
}

export default Orders;
