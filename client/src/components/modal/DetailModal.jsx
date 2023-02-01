import moment from "moment";
import { Modal, ModalBody } from "react-bootstrap";
import GetAge from "../../utils/GetAge";

export default function DetailModal({ show, setShow, target }) {
  function handleClose() {
    setShow(false);
  }
  return (
    <Modal show={show} onHide={() => handleClose()}>
      <ModalBody className="p-5">
        <p className="fw-bold fs-5 text-center">Detail Data</p>
        <p className="fw-bold fs-6">
          NIK:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {target?.nik}
          </span>
        </p>
        <p className="fw-bold fs-6">
          Nama Lengkap :{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {target?.name}
          </span>
        </p>
        <p className="fw-bold fs-6">
          Umur:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {GetAge(target?.dob)} Tahun
          </span>
        </p>
        <p className="fw-bold fs-6">
          Tanggal lahir:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {moment(target?.dob).format("LL")}
          </span>
        </p>
        <p className="fw-bold fs-6">
          Jenis Kelamin:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {target?.gender}
          </span>
        </p>
        <p className="fw-bold fs-6">
          Alamat:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {target?.address}
          </span>
        </p>
        <p className="fw-bold fs-6">
          Negara:{" "}
          <span style={{ float: "right" }} className="fw-normal">
            {target?.country}
          </span>
        </p>
      </ModalBody>
    </Modal>
  );
}
