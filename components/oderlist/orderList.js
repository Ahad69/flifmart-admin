import { MyContext } from "@/pages/_app";
import { Table, Tag } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const OrderList = ({ myOrder, pending }) => {
  const { myCount, setMyCount } = useContext(MyContext);

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "name",
      render: (_, { invoice, id }) => (
        <>
          <Tag color={"purple"}>
            <Link href={`/orders/${id}`}>{invoice}</Link>
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
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    {
      title: "Product Types",
      dataIndex: "products",
      key: "products",
      responsive: ["md"],
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { status }) => (
        <>
          <Tag color={"green"}>{status.toUpperCase()}</Tag>
        </>
      ),
    },
  ];

  const data = [];
  const datr = myOrder?.map((a) =>
    data.push({
      key: `${a._id}`,
      invoice: `${a?.invoice}`,
      name: `${a?.name}`,
      address: `${a?.address}`,
      products: `${a?.products}`,
      status: `${a?.status}`,
      id: `${a?._id}`,
    })
  );

  return (
    <div>
      {myCount == 1 ? (
        <button
          className="bg-blue-400 px-2 rounded text-white"
          onClick={() => setMyCount(myCount + 1)}
        >
          Get Orders
        </button>
      ) : (
        <button
          className="bg-purple-400 px-2 rounded text-white"
          onClick={() => setMyCount(myCount + 1)}
        >
          {" "}
          Get More Orders
        </button>
      )}

      <h1 className="text-end font-bold">Total Pending Order : {pending}</h1>
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default OrderList;
