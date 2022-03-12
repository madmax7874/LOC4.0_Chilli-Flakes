import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer";
import Login from "../screens/Login";

function TripPage() {
  return (
      <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <div style={{height:"100%", backgroundColor:"#E5E5E5",flex:"1"}}>
        <Login />
      </div>
      <div style={{ marginTop:"auto"}}>
        <Footer />
      </div>
    </div>
  );
}

export default TripPage;
