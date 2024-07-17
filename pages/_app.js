import MainLoading from "@/components/loading/mainLoading";
import "@/styles/globals.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export default function App({ Component, pageProps }) {
  const [isloading, setIsLoading] = useState(false);
  const [myCount, setMyCount] = useState(1);
  const [allDatas, setAllData] = useState([]);
  const [myOrder, setMyOrders] = useState([]);

  const [user, setUsers] = useState([]);

  const router = useRouter();
  const token = global?.document?.cookie;

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  const [search, setSearch] = useState("");
  const [userpage, setUserpage] = useState(1);
  const [usercurrent, setUserCurrent] = useState(1);
  const [reload, setReload] = useState(false);

  const usersStringfy = Cookies.get("token");

  async function allData() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/allData`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );

      setAllData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    allData();
  }, []);

  async function myOrders() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/orders/contribute`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      setMyOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (myCount == 1) {
      return;
    }
    myOrders();
  }, [myCount]);

  async function users() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/auth?search=${search}&page=${usercurrent}`
      );
      setUsers(response.data.data);
      setUserpage(response.data.page);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (usercurrent > 1) {
      users();
    }
    setTimeout(() => {
      users();
    }, 1000);
  }, [usercurrent, reload, search]);

  return (
    <MyContext.Provider
      value={{
        allDatas,
        isloading,
        myOrder,
        myCount,
        setMyCount,
        setMyOrders,
        user,
        setUsers,
        setSearch,
        userpage,
        usercurrent,
        setUserCurrent,
        reload,
        setReload,
      }}
    >
      {isloading ? <MainLoading /> : <Component {...pageProps} />}
    </MyContext.Provider>
  );
}
