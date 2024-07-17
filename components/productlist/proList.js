import { Table, Tag } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ProductModal from "../modals/productsModal";

const ProList = ({ myPro, setMyPro, startIndex, loading, sort, setSort }) => {
  const usersStringfy = Cookies.get("token");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const editModal = (id) => {
    setSelectedProduct(id);
    setOpen(true);
  };

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
          .delete(`https://flifmart-backend-v2.vercel.app/api/products/${id}`, {
            headers: {
              authorization: `Bearer ${usersStringfy}`,
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            const newPost = myPro.filter((a) => a._id !== id);
            setMyPro(newPost);
          });
      }
    });
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
            onClick={() => editModal(id)}
          >
            {name}
          </Tag>
          <Tag
            color={"cyan"}
            className="cursor-pointer block sm:hidden"
            onClick={() => editModal(id)}
          >
            {name.slice(0, 10)}
          </Tag>
        </>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (_, { products, id }) => (
        <div className="flex">
          <img className="w-12 h-12" src={products} />
        </div>
      ),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: () => setSort(sort == "desc" ? "asc" : "desc"),
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "offer",
      key: "address",
      responsive: ["md"],
    },
    {
      title: "Delete",
      key: "tags",
      dataIndex: "tags",
      render: (_, { id }) => (
        <>
          <Tag
            className="cursor-pointer"
            onClick={() => editModal(id)}
            color={"#87d068"}
          >
            View
          </Tag>
          {/* <Tag className="cursor-pointer" color={"#2db7f5"}>
            Edit
          </Tag> */}
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

  const data = [];
  const datr = myPro?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${index + startIndex}`,
      name: `${a?.name?.slice(0, 50)}`,
      offer: `৳ ${a?.offeredPrice}`,
      quantity: `${a?.quantity}`,
      id: `${a?._id}`,
      products: `${a?.productImage}`,
    })
  );

  return (
    <div className="productsList">
      <ProductModal open={open} setOpen={setOpen} id={selectedProduct} />
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default ProList;
