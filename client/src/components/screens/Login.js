import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Image } from "react-bootstrap";
import { useAlert } from "react-alert";

import axios from "axios";

import login from "../../assets/login.svg";
import "./LoginRegister.css";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  });

  const onSubmit = async (data) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/auth/login", data, config);
      localStorage.setItem("authToken", response.data.token);
      navigate("/");
    } catch (error) {
      alert.show(`${error.response.data.error}`, { type: "error" });
    }
  };

  return (
    <Fragment>
      <div className="login-screen">
        <Container className="login-container">
          <Row>
            <div className="col-12" style={{textAlign:"center", padding:"1rem"}}>
              <h3>Welcome Back!</h3>
            </div>
            <div className="col-lg-6" style={{textAlign:"center"}}>
              <Image fluid={true}
                src={login}
              ></Image>
            </div>
            <div className="col-lg-6 form-div">
              <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{textAlign:"center"}}>Login</h3>
                <Form.Group controlId="email">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Email address{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="email"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                    className={`${errors.email ? "input-error" : ""}`}
                  />
                  <p style={{ color: "red" }}>
                    {errors.email?.type === "required" && "Email address is required"}
                  </p>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Password{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    className={`${errors.password ? "input-error" : ""}`}
                  />
                  <p style={{ color: "red" }}>
                    {errors.password?.type === "required" && "Password is required"}
                  </p>
                </Form.Group>
                <p>
                  {" "}
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "1rem" }}
                  >
                    Login
                  </Button>
                </div>
            </Form>
            </div>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Login;
