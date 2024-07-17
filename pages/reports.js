import Layout from "@/components/layout/layout";
import Sales from "@/components/salesList/sales";
import { DatePicker, Input, Pagination, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
const { Search } = Input;

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const usersStringfy = Cookies.get("token");
  const [startIndex, setStartIndex] = useState(1);
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [names, setNames] = useState([]);

  const getSalesDetails = async () => {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/sales?id=${id}&date=${date}&page=${current}&size=${pageSize}`
        // {
        //   method: "GET",
        //   headers: {
        //     authorization: `Bearer ${usersStringfy}`,
        //   },
        // }
      );
      setSales(response.data.data);
      setPage(response.data.pages);
      setStartIndex(response.data.startIndex);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSalesDetails();
  }, [current, reload, pageSize, date, id]);

  const onPage = (page) => {
    setCurrent(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const pageSizeOptions = [10, 20, 30, 50, 100];

  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const onChange = (value) => {
    setId(value);
  };
  const onSearch = async (value) => {
    setLoading2(true);
    if (value.length > 4) {
      try {
        const response = await axios.get(
          `https://flifmart-backend-v2.vercel.app/api/products/filter?names=${value}`
        );
        setLoading2(false);
        setNames(response.data.data);
      } catch (error) {
        console.log(error);
        setLoading2(false);
      }
    }
    setLoading2(false);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <DatePicker onChange={onDateChange} />
        <Select
          style={{
            width: "280px",
          }}
          showSearch
          placeholder="Search Products"
          optionFilterProp="children"
          loading={loading2}
          allowClear
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={names?.map((a) => ({
            value: a?._id,
            label: a?.name?.slice(0, 20),
          }))}
        />
      </div>
      <Sales
        loading={loading}
        setReload={setReload}
        sales={sales}
        startIndex={startIndex}
        reload={reload}
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
    </Layout>
  );
};

export default Reports;
