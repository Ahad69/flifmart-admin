
import React, { useContext } from "react";

import OrderList from "@/components/oderlist/orderList";
import { MyContext } from "./_app";
import Layout from "@/components/layout/layout";
import Head from "next/head";

const Orders = () => {
  const { myOrder, isloading } = useContext(MyContext);



  return (

   <Layout>
           <Head>
        <title>Orders List</title>
      </Head>
     <div>
      {isloading ? (
        "loading"
      ) : (
        <>
          <OrderList
            myOrder={myOrder?.data?.products}
            pending={myOrder?.pendingOrders}

          
          ></OrderList>
        </>
      )}
    </div>
   </Layout>
  );
};

export default Orders;
