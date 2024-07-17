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

const AddPhotos = ({ reload, setReload }) => {
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
    const title = e.target.title.value;
    const productLink = e.target.productLink.value;
    const image = "";
    const category = e.target.category.value;

    const data = { title, productLink, image, category };

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
        .post("https://flifmart-backend-v2.vercel.app/api/photos", data, {
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
        Add Photo
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
            Title : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Full Name"
              name="title"
            />
          </label>
          <br />
          <br />
          <label>
            Category : <br />
            <select name="category" className="bg-gray-200 w-full">
              <option value={"মাছের ফিড"}>মাছের ফিড</option>
              <option value={"মাছের ঔষুধ"}>মাছের ঔষুধ</option>
              <option value={"গরুর খাবার"}>গরুর খাবার</option>
              <option value={"ছাদ কৃষি"}> ছাদ কৃষি</option>
              <option value={"উন্নত বীজ"}>উন্নত বীজ</option>
              <option value={"কৃষি যন্ত্রপাতি"}>কৃষি যন্ত্রপাতি</option>
              <option value={"জৈব সার"}>জৈব সার</option>
              <option value={"অন্যান্য"}>অন্যান্য</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            ProductLink : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Product Link"
              name="productLink"
            />
          </label>
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
              Add Photo
            </button>
          )}
        </form>
      </Modal>
    </>
  );
};
export default AddPhotos;
