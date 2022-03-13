import React, { Fragment, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap';
import MyPieChart from "./PieChart";
const axios = require("axios");

const Analyse = () => {
  const navigate = useNavigate()
  const [analyse, setAnalyse] = useState([]);
  const [vData, setVData] = useState();

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/private/analyse", config);
      setAnalyse(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const pieData = () => {
      let newArr=[
        { name: "dist 1", value: 0 },
        { name: "dist 2", value: 0 },
        { name: "dist 3", value: 0 },
      ]

      analyse.forEach((distri) => {
        if (distri.distributor.fullname === "dist 1"){newArr[0].value+=1}
        else if (distri.distributor.fullname === "dist 2"){newArr[1].value+=1}
        else if (distri.distributor.fullname === "dist 3"){newArr[2].value+=1}
      })

      setVData(newArr)
    };
    pieData();
  }, [analyse]);
  console.log(vData)


  return (
    <Fragment>
        <Container>
            <div style={{textAlign:"center",padding:"1rem"}}>
                <h2 style={{margin:"1rem"}}>Hello Manufacturer</h2>
                <h6 style={{margin:"1rem",textAlign:"center"}}>Analyse and track which distributors are used more and give discounts to them accordinly!</h6>
                <MyPieChart data={vData}/>
            </div>
        </Container>
    </Fragment>
  );
};
export default Analyse;
