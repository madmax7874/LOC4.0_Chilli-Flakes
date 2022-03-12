import React from "react";

import Head from "../screens/Head";
import Register from "../screens/Register";

function TripPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <div style={{height:"100%", backgroundColor:"#E5E5E5",flex:"1"}}>
        <Register />
      </div>
      <div style={{ marginTop:"auto"}}>
      </div>
    </div>
  );
}

export default TripPage;
