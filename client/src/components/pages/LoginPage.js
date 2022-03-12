import React from "react";

import Login from "../screens/Login";

function TripPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <div style={{height:"100%", backgroundColor:"#E5E5E5",flex:"1"}}>
        <Login />
      </div>
      <div style={{ marginTop:"auto"}}>
      </div>
    </div>
  );
}

export default TripPage;
