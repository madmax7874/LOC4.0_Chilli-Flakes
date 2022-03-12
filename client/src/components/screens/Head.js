import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const navbar = {
  padding: "0.4rem 1rem",
  fontSize: "1.2rem",
  backgroundColor: "#fff",
  borderBottom: "1px solid rgba(0,0,0,0.2)",
};

function Head() {
  function logoutHandler() {
    try {
      localStorage.removeItem("authToken");
    } catch (err) {
      console.log(err);
    }
  }

  return localStorage.getItem("authToken") ? (
    <Fragment>
      <Navbar style={navbar} expand="lg" variant="light" className="sticky-top">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              {/* <Image
                src={logo}
                style={{ maxHeight: "5rem", maxWidth: "5rem" }}
              ></Image> */}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e07a5f" : "#141850",
                  fontWeight: isActive ? "600" : "500",
                  borderBottom: isActive ? "2px solid #e07a5f" : "",
                })}
                className="nav-link"
                aria-current="page"
                to="/store"
              >
                Store
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e07a5f" : "#141850",
                  fontWeight: isActive ? "600" : "500",
                  borderBottom: isActive ? "2px solid #e07a5f" : "",
                })}
                className="nav-link"
                aria-current="page"
                to="/track"
              >
                Track
              </NavLink>
            </Nav>
            <br />
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px", marginLeft: "auto" }}
            >
              <NavLink
                onClick={() => logoutHandler()}
                style={({ isActive }) => ({
                  color: isActive ? "#e07a5f" : "#141850",
                  fontWeight: isActive ? "700" : "500",
                })}
                className="nav-link"
                aria-current="page"
                to="/login"
              >
                Logout
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  ) : (
    <Fragment>
      <Navbar style={navbar} expand="lg" variant="light" className="sticky-top">
        <Container>
          <Navbar.Brand>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#e07a5f" : "#141850",
                fontWeight: isActive ? "600" : "500",
                borderBottom: isActive ? "2px solid #e07a5f" : "",
              })}
              className="nav-link"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            ></Nav>
            <Nav
              className="my-2 my-lg-0 pt-2"
              style={{ maxHeight: "100px", marginLeft: "auto" }}
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e07a5f" : "#141850",
                  fontWeight: isActive ? "600" : "500",
                  borderBottom: isActive ? "2px solid #e07a5f" : "",
                })}
                className="nav-link"
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e07a5f" : "#141850",
                  fontWeight: isActive ? "600" : "500",
                  borderBottom: isActive ? "2px solid #e07a5f" : "",
                })}
                className="nav-link"
                aria-current="page"
                to="/register"
              >
                SignUp
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Head;
