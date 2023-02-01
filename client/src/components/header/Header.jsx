import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Logo from "../../assets/react.svg";

export default function Header() {
  return (
    <Navbar bg="white" variant="white" className="p-3">
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center gap-3 fw-bold fs-3"
        >
          <img
            alt=""
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          Aplikasi Data Pribadi
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
