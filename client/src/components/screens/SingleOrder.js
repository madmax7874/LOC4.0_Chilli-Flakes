import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const axios = require("axios");

function SingleOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
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
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Fragment>
      <Container></Container>
    </Fragment>
  );
}

export default SingleOrder;
