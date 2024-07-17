import { Pagination, Table, Tag, Tooltip, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import PDF from "../InvoicePdf/InvoicePdf";
import OderModal from "../modals/oderModal";

const OrderList = ({ myOrder, reload, setReload, startIndex, loading }) => {
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
      title: "Customer Name",
      dataIndex: "name",
      key: "age",
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
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      responsive: ["md"],
    },
    {
      title: "Invoice Download",
      key: "tags",
      dataIndex: "tags",
      render: (_, { id }) => (
        <>
          <Tag
            className="cursor-pointer block sm:hidden text-center"
            color={"#108ee9"}
            onClick={() => editModal(id)}
          >
            View
          </Tag>
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

  const data = [];
  const datr = myOrder?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${startIndex + index}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name.slice(0, 40)}`,
      address: `${a?.address.slice(0, 50)}`,
      products: a?.products,
      status: `${a?.status}`,
      id: `${a?._id}`,
      notes: `${a?.notes ? a?.notes?.slice(0, 40) : ""}`,
    })
  );

  return (
    <div className="shippingOrders">
      <OderModal
        openOder={openOder}
        setOpenOrder={setOpenOrder}
        id={selectedProduct}
        reload={reload}
        setReload={setReload}
      />
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
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

export default OrderList;
