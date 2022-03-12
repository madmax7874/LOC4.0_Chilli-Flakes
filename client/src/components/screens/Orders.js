import React, { Fragment, useEffect, useState } from "react";
import {Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const axios = require("axios");

function Store() {

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
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


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
      </Container>
    </Fragment>
  );
}

export default Store;
