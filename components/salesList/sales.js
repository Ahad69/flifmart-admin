import { Table, Tag } from "antd";
import React, { useState } from "react";
import ProductModal from "../modals/productsModal";

const Sales = ({ sales, setReload, reload, startIndex, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const editModal = (id) => {
    setSelectedProduct(id);
    setOpen(true);
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      responsive: ["md"],
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, { name, id }) => (
        <>
          <Tag color={"cyan"} onClick={() => editModal(id)}>
            {name.slice(0, 10)}
          </Tag>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "products",
      key: "products",
      render: (_, { products, id }) => (
        <div className="flex">
          <img className="w-12 h-12" src={products} />
        </div>
      ),
    },

    {
      title: "Sold Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "In Store",
      dataIndex: "available",
      key: "available",
    },
  ];

  const data = [];
  const datr = sales?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${startIndex + index}`,
      name: `${a?.productData?.[0]?.name?.slice(0, 20)}`,
      products: `${a?.productData?.[0]?.productImage}`,
      available: `${a?.productData?.[0]?.quantity} pieces`,
      quantity: `${a?.totalSale} pieces`,
      id: `${a?._id}`,
    })
  );
  return (
    <div>
      <ProductModal open={open} setOpen={setOpen} id={selectedProduct} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default Sales;
