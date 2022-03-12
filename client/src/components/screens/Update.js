import { useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Image } from "react-bootstrap";
import { useAlert } from "react-alert";

import "./LoginRegister.css";

const axios = require("axios");
const Swal = require("sweetalert2");

const Update = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (localStorage.getItem("role") != "manufacturer") {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const response = await axios.post("/api/private/store", data, config);
      alert.show("Item Added", { type: "success" });

      navigate("/store");
    } catch (error) {
      Swal.fire(`${error.response.data.error}`, "", "error");
    }
  };

  return (
    <>
      <Container className="login-container">
        <Row>
          <div className="col-lg-3"></div>
          <div className="col-lg-6  form-div">
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 style={{ textAlign: "center" }}>Add an Item</h3>
              <Form.Group controlId="name">
                <Form.Label style={{ fontSize: "1rem" }}>
                  Name{" "}
                  <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  autoComplete="off"
                  {...register("name", { required: true })}
                  className={`${errors.name ? "input-error" : ""}`}
                />
                <p style={{ color: "red" }}>
                  {errors.name?.type === "required" && "Name is required"}
                </p>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label style={{ fontSize: "1rem" }}>
                  Price{" "}
                  <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  {...register("price", { required: true })}
                  className={`${errors.price ? "input-error" : ""}`}
                />
                <p style={{ color: "red" }}>
                  {errors.price?.type === "required" && "Price is required"}
                </p>
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label style={{ fontSize: "1rem" }}>
                  Quantity{" "}
                  <span style={{ color: "#d00000", fontSize: "1rem" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  {...register("quantity", { required: true })}
                  className={`${errors.quantity ? "input-error" : ""}`}
                />
                <p style={{ color: "red" }}>
                  {errors.quantity?.type === "required" &&
                    "Quantity is required"}
                </p>
              </Form.Group>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="outline"
                  type="submit"
                  style={{
                    marginTop: "1rem",
                    color: "#e07a5f",
                    border: "2px solid #e07a5f",
                    fontWeight: "600",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Update;
