import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const UpdateVideos = ({ id, reload, setReload }) => {
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

  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value;
    const productLink = e.target.productLink.value;
    const videoLink = e.target.videoLink.value;
    const category = e.target.category.value;

    const data = { title, productLink, videoLink, category };

    const newData = {};

    for (let key in data) {
      newData[key] = data[key] === "" ? null : data[key];
    }

    //    try {
    //      await axios
    //        .patch(`https://flifmart-backend-v2.vercel.app/api/videos/${id}`, newData, {
    //          headers: {
    //            "content-type": "application/json",
    //          },
    //        })
    //        .then((res) =>
    //          Swal.fire({
    //            position: "top-center",
    //            icon: "success",
    //            title: "Your work has been saved",
    //            showConfirmButton: false,
    //            timer: 1500,
    //          })
    //        );
    //      setLoading(false);
    //      e.target.reset();
    //
    //      setIsModalOpen(false);
    //      setReload(!reload);
    //    } catch (error) {
    //      console.log(error);
    //    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Video
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handlesubmit}>
          <label>
            Title : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Full Name"
              name="title"
            />
          </label>{" "}
          <br />
          <br />
          <label>
            Video Link : <br />
            <input
              className="w-full bg-gray-100"
              placeholder="Video Link"
              name="videoLink"
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
              Add Video
            </button>
          )}
        </form>
      </Modal>
    </>
  );
};
export default UpdateVideos;
