import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import UserTable from "../table/UserTable";

export default function ListSection({ refetch, users }) {
  const [form, setForm] = useState({
    inputValue: "",
    inputType: "",
  });

  const [filter, setFilter] = useState();

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    if (form.inputType === "nik") {
      setFilter(
        users.filter(
          (element) => element[form.inputType] === parseInt(form.inputValue)
        )
      );
    } else if (form.inputType === "name") {
      setFilter(
        users.filter((element) =>
          element[form.inputType].includes(form.inputValue)
        )
      );
    }
  }

  return (
    <>
      <Container className="my-2 d-flex flex-column gap-2">
        <Form
          className="bg-secondary p-3 d-flex flex-row gap-2 align-items-end"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <Form.Group className="col-6">
            <Form.Label className="fs-5 fw-bold text-light">
              Pencarian Data Pribadi
            </Form.Label>
            <Form.Control
              type="text"
              name="inputValue"
              value={form.inputValue}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="col-2">
            <Form.Select
              name="inputType"
              value={form.inputType}
              onChange={(e) => handleOnChange(e)}
              required
            >
              <option value="">Pilih Pencarian</option>
              <option value="nik">NIK</option>
              <option value="name">Nama</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-2 d-flex gap-2">
            <Button className="col-6" type="submit">
              Cari
            </Button>
            <Button
              className="col-6"
              variant="danger"
              onClick={() => {
                setFilter();
                setForm({ inputValue: "", inputType: "" });
              }}
            >
              Reset
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <UserTable users={users} filter={filter} refetch={refetch} />
    </>
  );
}
