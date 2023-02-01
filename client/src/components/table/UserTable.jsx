import React, { useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import moment from "moment/moment";
import "moment/locale/id";
import GetAge from "../../utils/GetAge";
import UserForm from "../form/userForm";
import { API } from "../../data/api";
import FormatDate from "../../utils/FormatDate";
import DetailModal from "../modal/DetailModal";

export default function UserTable({ users, refetch, filter }) {
  moment.locale("id");
  const [showForm, setShowForm] = useState(false);
  const [target, setTarget] = useState();
  const [showDetail, setShowDetail] = useState();
  const [item, setItem] = useState({
    nik: "",
    name: "",
    gender: "",
    dob: "",
    address: "",
    country: "",
  });

  async function handleDelete(nik) {
    if (confirm("Hapus data ini ?") === true) {
      await API.delete("/user/" + nik);
      refetch();
    }
  }

  return (
    <Container className="my-2">
      <Table bordered hover>
        <thead className="bg-secondary text-light fw-bold text-center">
          <tr>
            <td style={{ width: "5%" }}>No.</td>
            <td style={{ width: "10%" }}>NIK</td>
            <td style={{ width: "10%" }}>Nama</td>
            <td style={{ width: "10%" }}>Umur</td>
            <td style={{ width: "10%" }}>Tanggal Lahir</td>
            <td style={{ width: "10%" }}>Jenis Kelamin</td>
            <td style={{ width: "20%" }}>Alamat</td>
            <td style={{ width: "10%" }}>Negara</td>
            <td style={{ width: "15%" }}>Action</td>
          </tr>
        </thead>
        <tbody>
          {filter?.length === 0 || users?.length === 0 ? (
            <>
              <tr>
                <td colSpan={9} className="text-center">
                  Data Tidak Ditemukan
                </td>
              </tr>
            </>
          ) : (
            <>
              {!!filter !== false ? (
                <>
                  {filter?.map((data, index) => (
                    <tr key={index} className="align-items-center">
                      <td>{index + 1}</td>
                      <td>{data.nik}</td>
                      <td>{data.name}</td>
                      <td>{GetAge(data.dob)} Tahun</td>
                      <td>{moment(data.dob).format("LL")}</td>
                      <td>{data.gender}</td>
                      <td>{data.address}</td>
                      <td>{data.country}</td>
                      <td>
                        <Col className="d-flex flex-column align-items-center gap-2">
                          <Button
                            className="col-12 btn-sm text-white"
                            variant="info"
                            onClick={() => {
                              setTarget(data);
                              setShowDetail(true);
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            className="col-12 btn-sm"
                            variant="primary"
                            onClick={() => {
                              setShowForm(true);
                              setItem({
                                nik: data.nik,
                                name: data.name,
                                gender: data.gender,
                                dob: FormatDate(data.dob),
                                address: data.address,
                                country: data.country,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="col-12 btn-sm"
                            variant="danger"
                            onClick={() => handleDelete(data.nik)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {users?.map((data, index) => (
                    <tr key={index} className="align-items-center">
                      <td>{index + 1}</td>
                      <td>{data.nik}</td>
                      <td>{data.name}</td>
                      <td>{GetAge(data.dob)} Tahun</td>
                      <td>{moment(data.dob).format("LL")}</td>
                      <td>{data.gender}</td>
                      <td>{data.address}</td>
                      <td>{data.country}</td>
                      <td>
                        <Col className="d-flex flex-column align-items-center gap-2">
                          <Button
                            className="col-12 btn-sm text-white"
                            variant="info"
                            onClick={() => {
                              setTarget(data);
                              setShowDetail(true);
                            }}
                          >
                            Detail
                          </Button>
                          <Button
                            className="col-12 btn-sm"
                            variant="primary"
                            onClick={() => {
                              setShowForm(true);
                              setItem({
                                nik: data.nik,
                                name: data.name,
                                gender: data.gender,
                                dob: FormatDate(data.dob),
                                address: data.address,
                                country: data.country,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="col-12 btn-sm"
                            variant="danger"
                            onClick={() => handleDelete(data.nik)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}
        </tbody>
      </Table>
      <UserForm
        show={showForm}
        setShow={setShowForm}
        title="Update User"
        item={item}
        refetch={refetch}
      />
      <DetailModal target={target} show={showDetail} setShow={setShowDetail} />
    </Container>
  );
}
