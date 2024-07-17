import { Modal, Table, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { MdCall, MdOutlineMailOutline } from "react-icons/md";
import Swal from "sweetalert2";

const Managementlist = ({
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
      render: (_, { name, id }) => (
        <>
          <Tag
            color={"cyan"}
            className="cursor-pointer hidden sm:block"
            //onClick={() => editModal(id)}
          >
            {name}
          </Tag>
          <Tag
            color={"cyan"}
            className="cursor-pointer block sm:hidden"
            //onClick={() => editModal(id)}
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Action",
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
          .delete(`https://flifmart-backend-v2.vercel.app/api/management/${id}`)
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
      name: `${a?.name?.slice(0, 50)}`,
      position: `${a?.position}`,
      area: `${a?.area}`,
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
        />
        <Modal
          title={modalData?.name}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <img src={modalData?.image} />
          <div className="p-2">
            <h2 className="text-3xl mt-3 text-center">
              {modalData?.name}
              <span className="text-xs mt-3 text-center uppercase">
                ({modalData?.team})
              </span>
            </h2>
            <h2 className="text-2xl mt-3 font-bold text-orange-600 text-center">
              {modalData?.position}
            </h2>{" "}
            <h2 className="text-xl my-1 font-bold text-sky-600 text-center">
              {modalData?.area}
            </h2>{" "}
            <div className="flex justify-center gap-2 items-center">
              <MdCall className="text-xl" />
              <p>{modalData?.phone}</p>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <MdOutlineMailOutline className="text-xl" />
              <p>{modalData?.email}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Managementlist;
