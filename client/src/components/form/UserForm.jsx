import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../data/api";
import Countries from "../../data/Countries";

export default function UserForm({ show, setShow, title, item, refetch }) {
  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    dob: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    setForm({
      nik: item?.nik || "",
      name: item?.name || "",
      gender: item?.gender || "",
      dob: item?.dob || "",
      address: item?.address || "",
      country: item?.country || "",
    });
  }, [
    item?.nik,
    item?.name,
    item?.gender,
    item?.dob,
    item?.address,
    item?.country,
  ]);

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "nik"
          ? e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
          : e.target.value,
    });
  }

  function handleClose() {
    setShow(false);
    setForm({
      nik: "",
      name: "",
      gender: "",
      dob: "",
      address: "",
      country: "",
    });
  }

  const handleOnSubmitPost = useMutation(async (e) => {
    try {
      e.preventDefault();
      form.nik = parseInt(form.nik);

      const response = await API.post("/user", form);
      if (response.status === 200) {
        alert("Data Berhasil Ditambahkan");
        handleClose();
        refetch();
      }
    } catch (error) {
      alert("Data Gagal Ditambahkan");
    }
  });

  const handleOnSubmitPatch = useMutation(async (e) => {
    try {
      e.preventDefault();
      form.nik = parseInt(form.nik);
      const response = await API.patch("/user", form);
      if (response.status === 200) {
        alert("Data Berhasil di Update");
        handleClose();
        refetch();
      }
    } catch (error) {
      alert("Data Gagal di Update");
    }
  });

  return (
    <Modal show={show} onHide={() => handleClose()} scrollable>
      <Modal.Body className="p-5">
        <Form
          onSubmit={(e) => {
            title === "Tambah User"
              ? handleOnSubmitPost.mutate(e)
              : title === "Update User"
              ? handleOnSubmitPatch.mutate(e)
              : "";
          }}
        >
          <Row>
            <Col xs={12}>
              <h2 className="text-left color-main fw-bold my-3">{title}</h2>
              <Form.Group className="my-3">
                <Form.Label>Nomor Induk Kependudukan</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={16}
                  minLength={16}
                  placeholder="NIK"
                  name="nik"
                  onChange={(e) => handleOnChange(e)}
                  value={form.nik}
                  disabled={title === "Update User" ? true : false}
                  required
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={50}
                  placeholder="Nama"
                  name="name"
                  onChange={(e) => handleOnChange(e)}
                  value={form.name}
                  required
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Col className="d-flex flex-row gap-3">
                  <Form.Check
                    type="radio"
                    name="gender"
                    onChange={(e) => handleOnChange(e)}
                    value="Laki-Laki"
                    label="Laki-Laki"
                    checked={form.gender === "Laki-Laki" ? true : false}
                    required
                  />
                  <Form.Check
                    type="radio"
                    name="gender"
                    onChange={(e) => handleOnChange(e)}
                    value="Perempuan"
                    label="Perempuan"
                    checked={form.gender === "Perempuan" ? true : false}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  onChange={(e) => handleOnChange(e)}
                  value={form.dob}
                  required
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ resize: "none", height: "150px" }}
                  name="address"
                  onChange={(e) => handleOnChange(e)}
                  value={form.address}
                  required
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Negara</Form.Label>

                <Form.Select
                  name="country"
                  value={form.country}
                  onChange={(e) => handleOnChange(e)}
                  required
                >
                  <option value="">Pilih Negara</option>
                  {Countries.map((country, index) => (
                    <option value={country.country} key={index}>
                      {country.country}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className=" d-flex flex-row gap-2 justify-content-center my-3">
            <Button className="col-5 btn-main" type="submit">
              Save
            </Button>
            <Button
              className="col-5"
              variant="danger"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
