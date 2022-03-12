import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Orders from "../screens/Orders";

function OrdersPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <Orders />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default OrdersPage;
