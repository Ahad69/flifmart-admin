import React from "react";
import { BsBox2HeartFill, BsCalendar2WeekFill } from "react-icons/bs";
import { ImUpload } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { FaShippingFast } from "react-icons/fa";
import {
  MdCalendarMonth,
  MdOutlineCalendarViewMonth,
  MdOutlineBookmarkBorder,
  MdCallReceived,
  MdOutlinePendingActions,
} from "react-icons/md";
import style from "./cards.module.css";
import Link from "next/link";

const Cards = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <div className={style.cards}>
          <Link href="/products/products-list">
            <div className="bg-red-400 p-2 shadow-lg shadow-red-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Total Products</p>
              <br />
              <div className="flex justify-between items-center">
                <BsBox2HeartFill className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.allProducts}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/products/products-list">
            <div className="bg-blue-400 p-2 shadow-lg shadow-blue-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Total Quantity</p>
              <br />
              <div className="flex justify-between items-center">
                <ImUpload className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.totalQuantity}
                </span>
              </div>
            </div>
          </Link>
        </div>
        {/*  <div className="bg-purple-400 p-2 shadow-lg shadow-purple-500/50 rounded w-full h-28">
          <p className="text-lg text-white font-bold">This Week Products</p>
          <br />
          <div className="flex justify-between items-center">
            <BsCalendar2WeekFill className="text-white text-2xl " />
            <span className="text-3xl text-white font-bold">
              {data?.last7Days}
            </span>
          </div>
        </div>
        <div className="bg-cyan-400 p-2 shadow-lg shadow-cyan-500/50 rounded w-full h-28">
          <p className="text-lg text-white font-bold">This Month Products</p>
          <br />
          <div className="flex justify-between items-center">
            <MdCalendarMonth className="text-white text-2xl " />
            <span className="text-3xl text-white font-bold">
              {data?.last30Days}
            </span>
          </div>
        </div>

        <div className="bg-orange-400 p-2 shadow-lg shadow-orange-500/50 rounded w-full h-28">
          <p className="text-lg text-white font-bold">Last Month Products</p>
          <br />
          <div className="flex justify-between items-center">
            <MdOutlineCalendarViewMonth className="text-white text-2xl " />
            <span className="text-3xl text-white font-bold">
              {data?.lastMonth}
            </span>
          </div>
        </div> */}
      </div>
      <br />
      <br />
      <br />
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <div className={style.cards}>
          <Link href="/orders/all">
            <div className="bg-yellow-400 p-2 shadow-lg shadow-yellow-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Total Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <MdOutlineBookmarkBorder className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.total}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/all">
            <div className="bg-cyan-400 p-2 shadow-lg shadow-cyan-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Today Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <MdCallReceived className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.today}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/all">
            <div className="bg-blue-400 p-2 shadow-lg shadow-blue-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Yesterday Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <MdOutlinePendingActions className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.yesterday}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/all">
            <div className="bg-green-400 p-2 shadow-lg shadow-green-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Last Week Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <TiTick className="text-white text-3xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.lastWeek}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/all">
            <div className="bg-orange-400 p-2 shadow-lg shadow-orange-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">This Month Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.thisMonth}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/all">
            <div className="bg-red-400 p-2 shadow-lg shadow-orange-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Last Month Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.lastMonthOrders}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* // status  */}
      <div className="pt-5">
        <h1 className="text-3xl font-bold mb-2">Order by Status</h1>
        <div className={style.cards}>
          <Link href="/orders/delivered/delivered">
            <div className="bg-purple-400 p-2 shadow-lg shadow-purple-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Orders Completed</p>
              <br />
              <div className="flex justify-between items-center">
                <MdCallReceived className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.delivery}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/pending-orders">
            <div className="bg-blue-400 p-2 shadow-lg shadow-blue-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Orders Pending</p>
              <br />
              <div className="flex justify-between items-center">
                <MdOutlinePendingActions className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.pending}
                </span>
              </div>
            </div>
          </Link>

          <Link href="/orders/received/orders">
            <div className="bg-green-400 p-2 shadow-lg shadow-green-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Orders Procced</p>
              <br />
              <div className="flex justify-between items-center">
                <TiTick className="text-white text-3xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.procced}
                </span>
              </div>
            </div>
          </Link>
          <Link href="/orders/shipping/shipping-orders">
            <div className="bg-orange-400 p-2 shadow-lg shadow-orange-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Order Shipping</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.shipping}
                </span>
              </div>
            </div>
          </Link>

          <Link href={"/orders/cancel/orders"}>
            <div className="bg-red-400 p-2 shadow-lg shadow-orange-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Cancel Order</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.cancel}
                </span>
              </div>
            </div>
          </Link>
          <Link href={"/orders/later/later"}>
            <div className="bg-fuchsia-400 p-2 shadow-lg shadow-fuchsia-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Later Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.later}
                </span>
              </div>
            </div>
          </Link>
          <Link href={"/orders/return/orders"}>
            <div className="bg-fuchsia-400 p-2 shadow-lg shadow-fuchsia-500/50 rounded w-full h-28">
              <p className="text-lg text-white font-bold">Return Orders</p>
              <br />
              <div className="flex justify-between items-center">
                <FaShippingFast className="text-white text-2xl " />
                <span className="text-3xl text-white font-bold">
                  {data?.returnOrder}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cards;
