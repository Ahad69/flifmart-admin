import React, { useState } from "react";
import Link from "next/link";
import { Table, Tag, Tooltip } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { IoReloadCircle } from "react-icons/io5";
import OderModal from "../modals/oderModal";

const Return = ({ orders, reload, setReload, loading, startIndex }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openOder, setOpenOrder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const editModal = (id) => {
    setSelectedProduct(id);
    setOpenOrder(true);
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
          <Tag color={"cyan"} onClick={() => editModal(id)}>
            {invoice}
          </Tag>
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
      render: (_, { quantity, id }) => <div className="flex">{quantity}</div>,
      responsive: ["md"],
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      responsive: ["md"],
    },

    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { status }) => (
        <>
          <Tag color={"green"}>{status.toUpperCase()}</Tag>
        </>
      ),
    },
  ];
  console.log(orders);
  const data = [];
  const datr = orders?.map((a, index) =>
    data.push({
      key: `${a.invoice}`,
      index: `${index + startIndex}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name}`,
      notes: `${a?.notes ? a?.notes?.slice(0, 40) : ""}`,
      quantity: `${a?.products.reduce(
        (acc, obj) => acc + obj.cartQuantity,
        0
      )}`,
      products: a?.products,
      status: `${a?.status}`,
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

  return (
    <div className="cancelOrders">
      <div className="flex items-center">
        <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
          Total Return Orders
        </h1>
        <IoReloadCircle
          className=" block ml-auto cursor-pointer text-red-400  text-white bg-red-600 text-2xl rounded"
          onClick={() => setReload(!reload)}
        />
      </div>
      {hasSelected ? (
        <button
          onClick={() => onDelete()}
          className="border border-green-400 px-3 rounded text-green-500 font-bold"
        >
          Delete
        </button>
      ) : (
        <button className="border border-gray-400 px-3 rounded text-gray-300 font-bold">
          Delete
        </button>
      )}
      <OderModal
        openOder={openOder}
        setOpenOrder={setOpenOrder}
        id={selectedProduct}
        reload={reload}
        setReload={setReload}
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

export default Return;
