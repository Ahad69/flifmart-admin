import Layout from "@/components/layout/layout";
import Loading from "@/components/loading/loading";
import { Pagination, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../_app";
import OrderList2 from "@/components/allorderslist/orderList";
import { IoReloadCircle } from "react-icons/io5";
import { Input } from "antd";
const { Search } = Input;

const Total = () => {
  const [isloading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [totalOrder, setTotalOrder] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [query, setQueryUser] = useState("");
  const [query2, setQueryStatus] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const { user } = useContext(MyContext);

  async function totalOrders() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/orders?query=${query}&size=${pageSize}&status=${query2}&page=${current}&date=${date}&searchText=${text}`
      );

      setTotalOrder(response.data.data.products);
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
  }, [query, query2, current, reload, date, text, pageSize]);

  const onPage = (value) => {
    setCurrent(value);
  };
  const onChange = (value) => {
    if (value == undefined) {
      return setQueryUser("");
    }
    setQueryUser(value);
  };

  const onChange2 = (value) => {
    if (value == undefined) {
      return setQueryStatus("");
    }
    setQueryStatus(value);
  };
  const onChangeDate = (value) => {
    if (value == undefined) {
      return setDate("");
    }
    setDate(value);
  };

  const onSearch = (value) => {
    if (value == undefined) {
      return setText("");
    }
    setText(value);
  };

  const filterUser = user.filter(
    (a) => a.role != "superAdmin" && a._id != "6472d3ffb3b04b789166235e"
  );

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const pageSizeOptions = [10, 20, 30, 50, 100];

  return (
    <Layout>
      <div>
        <div className="flex sm:flex-row flex-col justify-between">
          <div className="flex sm:flex-row flex-col justify-between items-start  sm:items-center">
            <IoReloadCircle
              className="mr-3 cursor-pointer text-red-400  text-white bg-red-600 text-2xl rounded"
              onClick={() => setReload(!reload)}
            />
            <Select
              showSearch
              allowClear
              className="w-full sm:w-4/12 "
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={filterUser.map((a) => ({
                label: a?.email,
                value: a?._id,
              }))}
            />
            <Select
              showSearch
              allowClear
              className="w-full sm:w-4/12 "
              placeholder="Select a status"
              optionFilterProp="children"
              onChange={onChange2}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "pending",
                  label: "Pending",
                },
                {
                  value: "procced",
                  label: "Procced",
                },
                {
                  value: "shipping",
                  label: "Shipping",
                },
                {
                  value: "delivered",
                  label: "Delivered",
                },
                {
                  value: "cancel",
                  label: "Cancel",
                },
                {
                  value: "later",
                  label: "Later",
                },
                {
                  value: "return",
                  label: "Return",
                },
              ]}
            />
            <Select
              showSearch
              allowClear
              className="w-full sm:w-4/12 "
              placeholder="Select Day"
              optionFilterProp="children"
              onChange={onChangeDate}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "today",
                  label: "Today",
                },
                {
                  value: "yesterday",
                  label: "Yesterday",
                },
                {
                  value: "lastWeek",
                  label: "Last Week",
                },
                {
                  value: "thismonth",
                  label: "This Month",
                },
                {
                  value: "lastmonth",
                  label: "Last Month",
                },
              ]}
            />
          </div>

          <Search
            allowClear
            className="w-full sm:w-4/12 "
            placeholder="Name, Phone or Invoice"
            onSearch={onSearch}
            enterButton
          />
        </div>
        {isloading ? (
          <Loading />
        ) : (
          <OrderList2
            totalOrder={totalOrder}
            reload={reload}
            startIndex={startIndex}
            setReload={setReload}
          />
        )}
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
  );
};

export default Total;
