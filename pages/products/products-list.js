import Layout from "@/components/layout/layout";
import ProList from "@/components/productlist/proList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { Input, Pagination, Select } from "antd";
import Head from "next/head";
import { IoReloadCircle } from "react-icons/io5";
const { Search } = Input;

const Productslist = () => {
  const [myPro, setMyPro] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [reload, setReload] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");

  const usersStringfy = Cookies.get("token");

  const onPage = (page) => {
    setCurrent(page);
  };

  async function myOrders() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/products/admin?page=${current}&size=${pageSize}&name=${productName}&cat=${category}&sort=${sort}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );

      setMyPro(response.data.data.products);
      setPage(response?.data?.page);
      setStartIndex(response.data.startIndex);
      setIsloading(false);
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }
  }
  useEffect(() => {
    setIsloading(true);

    myOrders();
  }, [current, pageSize, category, sort, productName, reload]);

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const pageSizeOptions = [10, 20, 30, 50, 100];

  const handleChange = (value) => {
    if (value === undefined) {
      setCategory("");
    } else {
      setCategory(value);
    }
  };

  const onSearch = (value) => {
    if (value === undefined) {
      setProductName("");
    } else {
      setProductName(value);
    }
  };

  return (
    <div>
      <Head>
        <title>Product List</title>
      </Head>
      <Layout>
        <div className="flex justify-between items-center">
          <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
            Total Products List
          </h1>
          <IoReloadCircle
            className="mr-3 cursor-pointer text-red-400  text-white bg-red-600 text-2xl rounded"
            onClick={() => setReload(!reload)}
          />
        </div>

        <div>
          <div className="flex justify-between">
            <Select
              style={{
                width: 220,
              }}
              allowClear
              onChange={handleChange}
              placeholder="Category"
              options={[
                {
                  value: "hot-offers",
                  label: "Hot Offers",
                },
                {
                  value: "home-and-gadgets",
                  label: "Home & Gadgets",
                },
                {
                  value: "health-and-beauty",
                  label: "Health & Beauty",
                },
                {
                  value: "kitchen-gadgets",
                  label: "Kitchen Gadgets",
                },
                {
                  value: "jewellery",
                  label: "Jewellery",
                },
              ]}
            />
            <Search
              style={{
                width: 420,
              }}
              placeholder="Product Name"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </div>

          <ProList
            myPro={myPro}
            setMyPro={setMyPro}
            startIndex={startIndex}
            loading={isloading}
            setSort={setSort}
            sort={sort}
          ></ProList>
          <br />

          <Pagination
            onShowSizeChange={onShowSizeChange}
            onChange={onPage}
            total={page}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`
            }
            showSizeChanger
            defaultPageSize={pageSize}
            defaultCurrent={current}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Productslist;
