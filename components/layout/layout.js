import Header from "@/components/header/header";
import { Collapse } from "antd";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../sidebar/sidebar";
const { Panel } = Collapse;

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = router.asPath;

  return (
    <>
      {router.asPath == "/" || router.asPath == "/login" ? (
        <div className="bg-gray-200">{children}</div>
      ) : (
        <>
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-gray-200">
              <Header />
              <div className="bg-gray-200 m-5">{children}</div>
            </div>
            <div className="drawer-side bg-white">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

              <ul className="menu w-72 bg-base-100 text-base-content bg-white">
                <div className=" w-full mt-1 h-16 border-b-2">
                  <img
                    className="normal-case block m-auto p-2 h-full"
                    src="/logo.png"
                  />
                </div>
                <Sidebar />
                {/* <Collapse accordion>
            <Panel header="This is panel header 1" key="1">
            <li
            className={`${
              pathname == "/orders/all"
                ? "bg-cyan-400 ml-5 text-white text-xl p-0 ml-5"
                : "red-green-400 border  mx-2"
            } mt-2`}
          >
            <Link href={`/orders/all`}> Order List</Link>
          </li>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>asdfsdfgbdfgh</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>sdfdfgdfghfg</p>
            </Panel>
          </Collapse>

          <li
            className={`${
              pathname == "/dashboard"
                ? "bg-cyan-400 ml-5 text-white text-xl p-0 ml-5"
                : "red-green-400 border  mx-2"
            } mt-10`}
          >
            <Link href={`/dashboard`}>Dashboard</Link>
          </li>

          <li
            className={`${
              pathname == "/products/products-list"
                ? "bg-cyan-400 ml-5 text-white text-xl p-0 ml-5"
                : "red-green-400 border  mx-2"
            } mt-2`}
          >
            <Link href={`/products/products-list`}> Products List</Link>
          </li> */}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
