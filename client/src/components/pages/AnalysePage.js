import React from "react";

import Head from "../screens/Head";
import Footer from "../screens/Footer"
import Analyse from "../screens/Analyse";

function AnalysePage() {
  return (
    <div style={{display:"flex",flexDirection:"column", minHeight:"100vh", margin:"0"}}>
      <Head />
      <Analyse />
      <div style={{  marginTop:"auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default AnalysePage;