import { Modal, Table, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const PhotosList = ({
  managements,
  reload,
  setReload,
  startIndex,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (details) => {
    setModalData(details);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (_, { name, details }) => (
        <>
          <Tag
            color={"cyan"}
            className="cursor-pointer hidden sm:block"
            //onClick={() => editModal(id)}
            onClick={() => showModal(details)}
          >
            {name}
          </Tag>
          <Tag
            color={"cyan"}
            className="cursor-pointer block sm:hidden"
            onClick={() => showModal(details)}
          >
            {name.slice(0, 10)}
          </Tag>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image, id }) => (
        <div className="flex">
          <img className="w-12 h-12" src={image} />
        </div>
      ),
    },

    {
      title: "Link",
      dataIndex: "productLink",
      key: "productLink",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Delete",
      key: "tags",
      dataIndex: "tags",
      render: (_, { id, details }) => (
        <>
          <Tag
            className="cursor-pointer"
            onClick={() => showModal(details)}
            color={"#87d068"}
          >
            View
          </Tag>
          {/* <Tag className="cursor-pointer" color={"#2db7f5"}>
            Edit
          </Tag> */}
          <Tag
            className="cursor-pointer"
            onClick={() => deleteUser(id)}
            color={"#f50"}
          >
            Delete
          </Tag>
        </>
      ),
    },
  ];

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://flifmart-backend-v2.vercel.app/api/photos/${id}`)
          .then((response) => {
            if (response.data.status == "success") {
              setReload(!reload);
            }
            Swal.fire("Deleted!", "Your file has been Transfered.", "success");
          })
          .catch((error) => {
            console.error("An error occurred");
            console.error(error);
          });
      }
    });
  };

  const data = [];
  const datr = managements?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${index + startIndex}`,
      name: `${a?.title?.slice(0, 50)}`,
      productLink: `${a?.productLink}`,
      category: `${a?.category}`,
      id: `${a?._id}`,
      image: `${a?.image}`,
      details: a,
    })
  );

  return (
    <div>
      <div className="productsList">
        <Table
          columns={columns}
          pagination={false}
          dataSource={data}
          loading={loading}
          scroll={{
            x: 240,
          }}
        />{" "}
        <Modal
          title={modalData?.name}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <img src={modalData?.image} />
          <div className="p-2">
            <h2 className="text-3xl mt-3 text-center">{modalData?.title}</h2>
            <h2 className="text-xl mt-3 text-center">
              <b>Category :</b> {modalData?.category}
            </h2>
            <h2 className="text-xl mt-3 text-center">
              <b>Product Link :</b> {modalData?.productLink}
            </h2>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PhotosList;
