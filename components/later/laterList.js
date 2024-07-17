import React, { useContext } from "react";
import {
  Button,
  Modal,
  Pagination,
  Select,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useState } from "react";

import { MyContext } from "@/pages/_app";
import axios from "axios";
import Swal from "sweetalert2";

import OderModal from "../modals/oderModal";
import PDF from "../InvoicePdf/InvoicePdf";
import { IoReloadCircle } from "react-icons/io5";

const LaterList = ({ orders, reload, setReload, loading, startIndex }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [transUser, setTransUser] = useState();
  const { user } = useContext(MyContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openOder, setOpenOrder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const editModal = (id) => {
    setSelectedProduct(id);
    setOpenOrder(true);
  };

  const [id, setId] = useState("");
  const [loader, setLoader] = useState(false);
  const selectId = (id) => {
    setLoader(true);
    setId(id);
  };

  {
    loader &&
      message.open({
        type: "loading",
        content: "Generating Invoice PDF",
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await axios
      .patch(`https://flifmart-backend-v2.vercel.app/api/orders/transfer`, {
        ids: selectedRowKeys,
        user: transUser,
      })
      .then((response) => {
        if (response.data.status == "success") {
          Swal.fire("Transfered!", "Your file has been Transfered.", "success");
        }
        setReload(!reload);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("An error occurred");
        console.error(error);
      });
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
      title: "Invoice",
      dataIndex: "invoice",
      key: "name",
      render: (_, { invoice, id }) => (
        <>
          <Tag color={"cyan"}>{invoice}</Tag>
        </>
      ),
    },

    {
      title: "Products Name",
      dataIndex: "products",
      key: "products",
      render: (_, { products, id }) => (
        <div className="flex sm:w-[210px]">
          {products.map((a) => (
            <Tooltip placement="top" title={a.name} color="green">
              <p className=" w-[120px] font-bold h-[40px] truncate">{a.name}</p>
            </Tooltip>
          ))}
        </div>
      ),
    },

    {
      title: "Customer ",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
    },

    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["md"],
      render: (_, { quantity, id }) => <div className="flex">{quantity}</div>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      responsive: ["md"],
    },

    {
      title: "Received By",
      key: "received",
      dataIndex: "received",
      render: (_, { received, id }) => (
        <>
          <p color={"green"}>
            {received?.[0].firstName + " " + received?.[0].lastName}{" "}
          </p>
        </>
      ),
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { status, id }) => (
        <>
          <Tag color={"green"}>{status.toUpperCase()}</Tag>

          <Tag
            className="cursor-pointer"
            color={"#108ee9"}
            onClick={() => editModal(id)}
          >
            View
          </Tag>
        </>
      ),
    },
  ];

  console.log(orders);

  const filterUser = user.filter(
    (a) => a.role != "superAdmin" && a._id != "6472d3ffb3b04b789166235e"
  );

  const data = [];
  const datr = orders?.map((a, index) =>
    data.push({
      key: `${a.invoice}`,
      status: `${a?.status}`,
      id: `${a?._id}`,
      index: `${index + startIndex}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name.slice(0, 40)}`,
      notes: `${a?.notes ? a?.notes?.slice(0, 40) : ""}`,
      quantity: `${a?.products.reduce(
        (acc, obj) => acc + obj.cartQuantity,
        0
      )}`,

      products: a?.products,
      received: a?.receivedBy,
    })
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onDelete = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.post(
            "https://flifmart-backend-v2.vercel.app/api/orders/delete-documents",
            { documentIds: selectedRowKeys }
          );
          console.log(response.data);
          setReload(!reload);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onTransfer = (value) => {
    setTransUser(value);
  };

  return (
    <div className="completeOrders">
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          onClick={() => onDelete()}
          disabled={!hasSelected}
          loading={loading}
        >
          Delete
        </Button>
        <Button
          onClick={() => showModal()}
          disabled={!hasSelected}
          loading={loading}
        >
          Transfer
        </Button>
        <Modal
          title="Are sure to transfer ??"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedRowKeys?.map((a) => (
            <>
              {" "}
              <Tag color={"cyan"} key={a}>
                {a.split("=")[0]}
              </Tag>{" "}
              <br />{" "}
            </>
          ))}
          <br />
          Transfer to : <br />
          <Select
            showSearch
            allowClear
            className="w-6/12"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onTransfer}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={filterUser.map((a) => ({
              label: a?.email,
              value: a?._id,
            }))}
          />
        </Modal>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <div className="flex items-center">
        <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
          Total Later Orders
        </h1>
        <IoReloadCircle
          className=" block ml-auto cursor-pointer text-red-400  text-white bg-red-600 text-2xl rounded"
          onClick={() => setReload(!reload)}
        />
      </div>

      <OderModal
        openOder={openOder}
        setOpenOrder={setOpenOrder}
        id={selectedProduct}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default LaterList;