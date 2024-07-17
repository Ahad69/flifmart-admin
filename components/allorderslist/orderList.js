import { MyContext } from "@/pages/_app";
import { Table, Tag, Tooltip } from "antd";
import Link from "next/link";
import React, { useContext, useState } from "react";
import OderModal from "../modals/oderModal";

const OrderList2 = ({ totalOrder, reload, setReload, startIndex }) => {
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
          <Tag
            className="cursor-pointer"
            color={"purple"}
            onClick={() => editModal(id)}
          >
            {invoice}
          </Tag>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "age",
      //responsive: ["md"],
    },
    {
      title: "Order Amount",
      dataIndex: "amount",
      key: "amount",
      //responsive: ["md"],
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, { paymentStatus, id }) => (
        <>
          {paymentStatus == "cancel" && (
            <Tag color={"#368BC1"}>{paymentStatus.toUpperCase()}</Tag>
          )}
          {paymentStatus == "fail" && (
            <Tag color={"#E45E9D"}>{paymentStatus.toUpperCase()}</Tag>
          )}
          {paymentStatus == "success" && (
            <Tag color={"#006400"}>{paymentStatus.toUpperCase()}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      render: (_, { method, id }) => (
        <>
          {method == "bkash" && (
            <img className="w-[70px]" src="/payment/bkash.png" />
          )}
          {method == "rocket" && (
            <img className="w-[70px]" src="/payment/rocket.png" />
          )}
          {method == "nagad" && (
            <img className="w-[70px]" src="/payment/nagad.gif" />
          )}
          {method == "cod" && (
            <img className="w-[70px]" src="/payment/cod.png" />
          )}
          {!method && <img className="w-[70px]" src="/payment/cod.png" />}
          {method == "upay" && (
            <img className="w-[70px]" src="/payment/upay.png" />
          )}
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
              <p className="w-[100px] sm:w-[150px] font-bold h-[40px] truncate">
                {a.name}
              </p>
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
          {status == "pending" && (
            <Tag color={"#A52A2A"}>{status.toUpperCase()}</Tag>
          )}
          {status == "procced" && (
            <Tag color={"#368BC1"}>{status.toUpperCase()}</Tag>
          )}
          {status == "shipping" && (
            <Tag color={"#E45E9D"}>{status.toUpperCase()}</Tag>
          )}
          {status == "delivered" && (
            <Tag color={"#006400"}>{status.toUpperCase()}</Tag>
          )}
          {status == "cancel" && (
            <Tag color={"#9D00FF"}>{status.toUpperCase()}</Tag>
          )}
          {status == "later" && (
            <Tag color={"#696"}>{status.toUpperCase()}</Tag>
          )}
          {status == "return" && (
            <Tag color={"#696"}>{status.toUpperCase()}</Tag>
          )}
        </>
      ),
      //responsive: ["md"],
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      responsive: ["md"],
      render: (_, { id }) => (
        <>
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
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      //responsive: ["md"],
      render: (_, { notes, id }) => (
        <>
          <Tooltip placement="top" title={notes}>
            <p className=" w-[120px] h-[40px] truncate">{notes}</p>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Received By",
      dataIndex: "receivedBy",
      key: "receivedBy",
      //responsive: ["md"],
      render: (_, { receivedBy, id }) => (
        <>
          <Tooltip
            placement="top"
            title={
              receivedBy?.[0]?._id == "6472d3ffb3b04b789166235e" ? (
                "No One Received"
              ) : (
                <p className=" w-[120px] h-[40px] truncate">
                  {receivedBy?.[0]?.firstName + " " + receivedBy?.[0]?.lastName}
                </p>
              )
            }
          >
            {receivedBy?.[0]?._id == "6472d3ffb3b04b789166235e" ? (
              "No One Received"
            ) : (
              <p className=" w-[120px] h-[40px] truncate">
                {receivedBy?.[0]?.firstName + " " + receivedBy?.[0]?.lastName}
              </p>
            )}
          </Tooltip>
        </>
      ),
    },
  ];

  const data = [];
  const datr = totalOrder?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${index + startIndex}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name.slice(0, 40)}`,
      amount: `৳ ${a?.total}`,
      products: a?.products,

      receivedBy: a?.receivedBy,
      method: a?.method,
      paymentStatus: a?.paymentStatus,

      status: `${a?.status}`,
      id: `${a?._id}`,
      notes: `${a?.notes ? a?.notes : ""}`,
    })
  );

  return (
    <div>
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
        scroll={{
          x: 1340,
        }}
      />
    </div>
  );
};

export default OrderList2;
