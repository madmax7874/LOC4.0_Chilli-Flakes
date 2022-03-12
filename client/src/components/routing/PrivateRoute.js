import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const checkAuth = () =>{
    return localStorage.getItem("authToken") ? true : false
  }
  return (
    checkAuth() ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
