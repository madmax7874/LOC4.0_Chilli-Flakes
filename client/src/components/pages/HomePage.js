import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Home from "../screens/Home";

function HomePage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <Home />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
