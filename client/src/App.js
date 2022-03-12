import { BrowserRouter, Routes, Route } from "react-router-dom";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Routing
// import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Login from "./components/pages/LoginPage";
import Register from "./components/pages/RegisterPage";
// import Home from "./components/pages/HomePage";

// css files
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/screens/styles.scss"

const App = () => {
  const options = {
    position: "bottom center",
    timeout: 2000,
    offset: "30px",
    transition: transitions.FADE,
  };
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
};

export default App;
