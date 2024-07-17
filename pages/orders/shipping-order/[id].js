import Layout from "@/components/layout/layout";
import Details from "@/components/shippingOrders/orderDetails";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Shipped = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [reload, setReload] = useState(false);

  const back = () => {
    router.back();
  };
  const usersStringfy = Cookies.get("token");

  async function myOrder() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/orders/${router?.query?.id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      setOrder(response.data.data.order?.[0]);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    if (router?.query?.id) {
      myOrder();
    } else {
      return;
    }
  }, [router?.query, reload]);

  return (
    <Layout>
      <label
        onClick={() => back()}
        className="flex items-center block p-2 cursor-pointer  w-24  hover:text-blue-400"
      >
        <FaArrowAltCircleLeft className="text-2xl hover:text-blue-400" />
        Back
      </label>
      {loading ? (
        "loading"
      ) : (
        <div>
          <Details data={order} reload={reload} setReload={setReload} />
        </div>
      )}
    </Layout>
  );
};

export default Shipped;
