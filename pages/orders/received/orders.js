import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Cookies from "js-cookie";
import OrderList from "@/components/receivedOrderList/order";
import axios from "axios";
import Head from "next/head";
import { Pagination } from "antd";

const Orders = () => {
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
        `https://flifmart-backend-v2.vercel.app/api/orders/procced?page=${current}&size=${pageSize}`,
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
        <title>Procced Orders List </title>
      </Head>
      <div>
        <>
          <OrderList
            myOrder={orders}
            reload={reload}
            setReload={setReload}
            loading={loading}
            startIndex={startIndex}
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

export default Orders;
