import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Addmanagement = ({ reload, setReload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel2 = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const position = e.target.position.value;
    const image = "";
    const team = e.target.team.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const area = e.target.area.value;

    const data = { name, position, image, team, email, phone, area };

    try {
      const formData = new FormData();
      formData.append("images", fileList?.[0]?.originFileObj);

      await fetch("https://flifmart-backend-v2.vercel.app/api/files2/files", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          data.image = result.url;
        });

      await axios
        .post("https://flifmart-backend-v2.vercel.app/api/management", data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) =>
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })
        );
      setLoading(false);
      e.target.reset();
      setFileList([]);
      setIsModalOpen(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Management
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
        >
          {fileList.length < 1 && "+ Picture"}
        </Upload>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel2}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        <form onSubmit={handlesubmit}>
          <label>
            Name : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Full Name"
              name="name"
            />
          </label>
          <br />
          <br />
          <label>
            Position : <br />
            <select name="position" className="bg-gray-200 w-full">
              <option value={"Manager"}>Manager</option>
              <option value={"Managing Director"}>Managing Director</option>
              <option value={"CEO"}>CEO</option>
              <option value={"Director Of Sales"}>Director Of Sales</option>
              <option value={"Head of Sale"}>Head of Sale</option>
              <option value={"Head of Accounts"}>Head of Accounts</option>
              <option value={"Admin Officer"}>Admin Officer</option>
              <option value={"Human Resources (HR)"}>
                Human Resources (HR)
              </option>
              <option value={"General Manager"}>General Manager</option>
              <option value={"Divisional Sales Manager"}>
                Divisional Sales Manager
              </option>
              <option value={"Regional Sales Manager"}>
                Regional Sales Manager
              </option>

              <option value={"Area Manager ( Sales)"}>
                Area Manager ( Sales)
              </option>
              <option value={"Sales Officer"}>Sales Officer</option>
              <option value={"Customer Support Officer"}>
                Customer Support Officer
              </option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Team : <br />
            <select name="team" className="bg-gray-200 w-full">
              <option value={"board of directors"}>Board of Directors</option>
              <option value={"management team"}>Manager Assistant</option>
              <option value={"sales team"}>Sales Assistant</option>
              <option value={"support team"}>Support Assistant</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Email : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Email"
              name="email"
              type="email"
            />
          </label>
          <br />
          <br />
          <label>
            Phone : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Phone"
              name="phone"
            />
          </label>{" "}
          <br />
          <br />
          <label>
            Area : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Area"
              name="area"
            />
          </label>{" "}
          <br />
          <br />
          {loading ? (
            <button
              disabled
              className="bg-green-600 text-white px-10 py-2 cursor-not-allowed"
            >
              Please Wait...
            </button>
          ) : (
            <button className="bg-green-600 text-white px-10 py-2">
              Add Management
            </button>
          )}
        </form>
      </Modal>
    </>
  );
};
export default Addmanagement;
