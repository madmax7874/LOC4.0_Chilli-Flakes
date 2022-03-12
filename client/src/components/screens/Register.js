import { useEffect, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Image } from "react-bootstrap";
import { useAlert } from "react-alert";

import login from "../../assets/login.svg";
import "./LoginRegister.css";

const axios = require("axios");
const Swal = require("sweetalert2");

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    setValue,
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

    if (data.password !== data.confirmpassword) {
      setValue("password");
      setValue("confirmpassword");
      return alert.show("Passwords do not match", { type: "error" });
    }

    try {
      const response = await axios.post("/api/auth/register", data, config);
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      Swal.fire(`${error.response.data.error}`, "", "error");
    }
  };

  return (
    <Fragment>
      <div className="login-screen">
        <Container className="login-container">
          <Row>
            <div
              className="col-12"
              style={{ textAlign: "center", padding: "1rem" }}
            >
              <h3>New Here? Register below</h3>
            </div>
            <div className="col-lg-6" style={{ textAlign: "center" }}>
              <Image fluid={true} src={login}></Image>
            </div>
            <div className="col-lg-6 form-div">
              <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{ textAlign: "center" }}>Register</h3>
                <Form.Group controlId="fullname">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Full Name{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Enter name"
                    autoComplete="off"
                    {...register("fullname", { required: true })}
                    className={`${errors.fullname ? "input-error" : ""}`}
                  />
                  <p style={{ color: "red" }}>
                    {errors.fullname?.type === "required" && "Name is required"}
                  </p>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Email Address{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    {...register("email", { required: true })}
                    className={`${errors.email ? "input-error" : ""}`}
                  />
                  <p style={{ color: "red" }}>
                    {errors.email?.type === "required" && "Email is required"}
                  </p>
                </Form.Group>
                <Form.Group controlId="select">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Role{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    name="role"
                    {...register("role", { required: true })}
                  >
                    <option value="consumer" selected>
                      Consumer
                    </option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="distributor">Distributor</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Password{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>
                      *
                    </span>
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
                    {errors.password?.type === "required" &&
                      "Password is required"}
                  </p>
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                  <Form.Label style={{ fontSize: "1rem" }}>
                    Confirm Password{" "}
                    <span style={{ color: "#d00000", fontSize: "1rem" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmpassword"
                    placeholder="Re-enter password"
                    autoComplete="off"
                    {...register("confirmpassword", { required: true })}
                    className={`${errors.confirmpassword ? "input-error" : ""}`}
                  />
                  <p style={{ color: "red" }}>
                    {errors.confirmpassword?.type === "required" &&
                      "Password is required again"}
                  </p>
                </Form.Group>
                <p>
                  {" "}
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "1rem" }}
                  >
                    Register
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

export default Register;
