import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import SingleOrder from "../screens/SingleOrder";

function SingleOrderPage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <SingleOrder/>
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default SingleOrderPage;
