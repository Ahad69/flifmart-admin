import { Pagination, Table, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { TfiReload } from "react-icons/tfi";
import { Input } from "antd";
import { FaUser, FaUserLock } from "react-icons/fa";
const { Search } = Input;

const UserList = ({
  user,
  userpage,
  usercurrent,
  setUserCurrent,
  setReload,
  reload,
  setSearch,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onPage = (page) => {
    setUserCurrent(page);
  };

  const onSearch = (value) => setSearch(value);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name, id }) => (
        <>
          <Tag color={"cyan"}>{name}</Tag>
        </>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      responsive: ["md"],
    },
    {
      title: "Image",
      dataIndex: "avater",
      key: "avater",
      render: (_, { avater, id }) => (
        <>
          <FaUser className="text-2xl" />
        </>
      ),
    },
  ];

  const filterUser = user?.filter(
    (a) => a.role != "superAdmin" && a._id != "6472d3ffb3b04b789166235e"
  );

  const data = [];
  const datr = filterUser?.map((a) =>
    data.push({
      key: `${a?._id}`,
      name: `${a?.firstName + " " + a?.lastName}`,
      email: `${a?.email}`,
      role: `${a?.role}`,
      avater: `${a?.avater}`,
      id: `${a?._id}`,
    })
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteUser = () => {
    const ids = JSON.stringify(selectedRowKeys);
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
          .post(
            `https://flifmart-backend-v2.vercel.app/api/auth/delete?ids=${ids}`
          )
          .then((response) => {
            if (response.data.status == "success") {
              setReload(!reload);
            }
            Swal.fire(
              "Transfered!",
              "Your file has been Transfered.",
              "success"
            );
          })
          .catch((error) => {
            console.error("An error occurred");
            console.error(error);
          });
      }
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div className="flex justify-between items-center">
        {selectedRowKeys.length > 0 ? (
          <button
            className="text-white font-bold bg-red-400 px-3 rounded"
            onClick={() => deleteUser()}
          >
            Delete
          </button>
        ) : (
          <button className="text-white font-bold bg-gray-400 px-3 rounded">
            Delete
          </button>
        )}

        <div className="flex">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
          <button className="ml-5" onClick={() => setReload(!reload)}>
            <TfiReload className="font-bold text-blue-400" />
          </button>
        </div>
      </div>
      <br />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      <Pagination
        showSizeChanger={false}
        pageSize={10}
        defaultCurrent={usercurrent}
        onChange={onPage}
        total={userpage}
      />
    </div>
  );
};

export default UserList;
