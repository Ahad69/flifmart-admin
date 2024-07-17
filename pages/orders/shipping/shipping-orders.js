import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Cookies from "js-cookie";
import axios from "axios";
import OrderList from "@/components/shippingOrderList/order";
import Head from "next/head";
import { Pagination } from "antd";
import { IoReloadCircle } from "react-icons/io5";

const Shipping = () => {
  const [current, setCurrent] = useState(1);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const usersStringfy = Cookies.get("token");
  const [startIndex, setStartIndex] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  async function myOrders() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/orders/shipping?page=${current}&size=${pageSize}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      setPage(response.data.page);
      setOrders(response.data.data);
      setStartIndex(response.data.startIndex);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }
  useEffect(() => {
    setLoading(true);
    myOrders();
  }, [current, reload, pageSize]);
  const onPage = (page) => {
    setCurrent(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const pageSizeOptions = [10, 20, 30, 50, 100];
  return (
    <Layout>
      <Head>
        <title>Shipping Orders List </title>
      </Head>
      <div className="flex justify-between items-center">
        <h1 className="text-start text-2xl text-cyan-600 mb-2 font-bold">
          Total Shipping Orders
        </h1>
        <IoReloadCircle
          className="mr-3 cursor-pointer text-red-400  text-white bg-red-600 text-2xl rounded"
          onClick={() => setReload(!reload)}
        />
      </div>

      <div>
        <>
          <OrderList
            myOrder={orders}
            startIndex={startIndex}
            reload={reload}
            setReload={setReload}
            loading={loading}
          />
          <Pagination
            onChange={onPage}
            total={page}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`
            }
            showSizeChanger
            defaultPageSize={pageSize}
            defaultCurrent={current}
            pageSizeOptions={pageSizeOptions}
            onShowSizeChange={onShowSizeChange}
          />
        </>
      </div>
    </Layout>
  );
};

export default Shipping;
