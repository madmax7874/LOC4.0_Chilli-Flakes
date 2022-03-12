import React, { Fragment, useEffect } from "react";
const axios = require("axios");

function Store() {

  useEffect(async () => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const {data} = await axios.get("/api/private/store", config);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
  });
  return <Fragment></Fragment>;
}

export default Store;
