import React, { Fragment, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap';
import MyPieChart from "./PieChart";
const axios = require("axios");

const Analyse = () => {
  const navigate = useNavigate()
  const [analyse, setAnalyse] = useState({});

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/private/analyse", config);
    //   setAnalyse(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <Fragment>
        <Container>
            <div style={{textAlign:"center",padding:"1rem"}}>
                <h2 style={{margin:"1rem"}}>Hello Manufacturer</h2>
                <h6 style={{margin:"1rem",textAlign:"center"}}>Analyse and track which distributors are used more and give discounts to them accordinly!</h6>
                <MyPieChart data={analyse}/>
            </div>
        </Container>
    </Fragment>
  );
};
export default Analyse;
