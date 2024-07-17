import Addmanagement from "@/components/addmanagement/addmanagement";
import Layout from "@/components/layout/layout";
import Managementlist from "@/components/management/managementlist";
import { Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManagementTeam = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [current, setCurrent] = useState(1);
  const [reload, setReload] = useState(false);
  const [startIndex, setStartIndex] = useState(1);

  const getProducts = async () => {
    await axios
      .get(
        `https://flifmart-backend-v2.vercel.app/api/management?page=${current}`
      )
      .then((res) => {
        setLoading(false);
        setProducts(res?.data?.data);
        setTotal(res?.data?.pages);
        setStartIndex(res?.data?.startIndex);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, [current, reload]);

  const setPage = (e) => {
    setCurrent(e);
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-2xl p-2 text-black">Management List</h1>
          <Addmanagement reload={reload} setReload={setReload} />
        </div>
        <Managementlist
          loading={loading}
          managements={products}
          startIndex={startIndex}
          reload={reload}
          setReload={setReload}
        />{" "}
        <Pagination
          onChange={setPage}
          total={total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} orders`
          }
          defaultPageSize={30}
          defaultCurrent={current}
        />
      </Layout>
    </div>
  );
};

export default ManagementTeam;
