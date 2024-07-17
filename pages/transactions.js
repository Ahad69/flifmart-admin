import Layout from "@/components/layout/layout";
import Transaction from "@/components/transaction/transaction";
import { Pagination } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [reload, setReload] = useState(false);
  const usersStringfy = Cookies.get("token");
  const [startIndex, setStartIndex] = useState(1);

  async function totalOrders() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/orders/delivered?page=${current}&size=${pageSize}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      setOrders(response.data.data.products);
      setPage(response.data.pages);
      setStartIndex(response.data.startIndex);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    totalOrders();
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
        <title>Transactions List </title>
      </Head>

      <Transaction
        orders={orders}
        setReload={setReload}
        reload={reload}
        loading={loading}
        startIndex={startIndex}
      ></Transaction>
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
    </Layout>
  );
};

export default Transactions;