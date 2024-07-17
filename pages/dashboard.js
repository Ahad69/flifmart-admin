import { useContext } from "react";
import { MyContext } from "./_app";
import Loading from "@/components/loading/loading";
import Cards from "@/components/dashCard/cards";
import Layout from "@/components/layout/layout";
import Head from "next/head";

export default function Home() {
  const { allDatas, isloading } = useContext(MyContext);
  return (
    <Layout>
           <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      </div>
      {isloading ? <Loading /> : <Cards data={allDatas} />}
    </Layout>
  );
}
