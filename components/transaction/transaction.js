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

const Transaction = ({ orders, reload, setReload, loading, startIndex }) => {
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
      title: "Customer ",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["md"],
      render: (_, { quantity, id }) => <div className="flex">{quantity}</div>,
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      responsive: ["md"],
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
    {
      title: "Invoice Download",
      key: "tags",
      dataIndex: "tags",
      responsive: ["md"],
      render: (_, { id }) => (
        <>
          <button
            className="bg-red-400 text-white px-2 rounded"
            onClick={() => selectId(id)}
          >
            {" "}
            Download{" "}
          </button>
        </>
      ),
    },
  ];

  const filterUser = user.filter(
    (a) => a.role != "superAdmin" && a._id != "6472d3ffb3b04b789166235e"
  );

  const data = [];
  const datr = orders?.map((a, index) =>
    data.push({
      key: `${a.invoice}`,
      invoice: `${a?.invoice}`,
      index: `${index + startIndex}`,
      name: `${a?.name.slice(0, 40)}`,
      quantity: `${a?.products.reduce(
        (acc, obj) => acc + obj.cartQuantity,
        0
      )}`,
      total: `৳${a?.total}`,
      status: `${a?.status}`,
      id: `${a?._id}`,
      products: a?.products,
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

  const onTransfer = (value) => {
    setTransUser(value);
  };

  return (
    <div className="transactions">
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          onClick={() => showModal()}
          disabled={!hasSelected}
          loading={loading}
        >
          Delete
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
      <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
        Transactions of Orders
      </h1>
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

      {id && (
        <div>
          <p
            className="text-end m-auto text-2xl text-red-400 cursor-pointer"
            onClick={() => setId("")}
            style={{ width: "650px" }}
          >
            X
          </p>
          <PDF ids={id} setLoader={setLoader} />
        </div>
      )}
    </div>
  );
};

export default Transaction;
