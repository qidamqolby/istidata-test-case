import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import UserForm from "../form/UserForm";

export default function AddSection({ refetch }) {
  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState({
    nik: "",
    name: "",
    gender: "",
    dob: "",
    address: "",
    country: "",
  });
  return (
    <Container>
      <Col className="bg-secondary p-3">
        <h5 className="fs-5 fw-bold text-light">Tambah Data Pribadi</h5>
        <Button onClick={() => setShowForm(true)}>Tambah</Button>
      </Col>
      <UserForm
        show={showForm}
        setShow={setShowForm}
        title="Tambah User"
        item={item}
        refetch={refetch}
      />
    </Container>
  );
}
