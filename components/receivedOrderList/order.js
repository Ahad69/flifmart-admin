import { MyContext } from "@/pages/_app";
import { Pagination, Table, Tag, Tooltip } from "antd";
import Link from "next/link";
import React, { useContext, useState } from "react";
import OderModal from "../modals/oderModal";
import { IoReloadCircle } from "react-icons/io5";

const OrderList = ({ myOrder, startIndex, loading, reload, setReload }) => {
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
          <Tag color={"cyan"}>
            <Link href={`/orders/procced-order/${id}`}>{invoice}</Link>
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

  const data = [];
  const datr = myOrder?.map((a, index) =>
    data.push({
      key: `${a.invoice}`,
      index: `${index + startIndex}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name}`,

      quantity: `${a?.products.reduce(
        (acc, obj) => acc + obj.cartQuantity,
        0
      )}`,
      notes: `${a?.notes ? a?.notes?.slice(0, 40) : ""}`,
      products: a?.products,
      status: `${a?.status}`,
      id: `${a?._id}`,
    })
  );

  return (
    <div className="receivedOrders">
      <div className="flex items-center">
        <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
          Total Procced Orders
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
        reload={reload}
        setReload={setReload}
      />
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default OrderList;
