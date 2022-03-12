import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Store from "../screens/Store";

function StorePage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <Store />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default StorePage;
