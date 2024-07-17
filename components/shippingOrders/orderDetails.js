import React, { useContext, useState } from "react";
import style from "./orderDetails.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Details = ({ data, reload, setReload }) => {
  const handleDelivered = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delivered it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://flifmart-backend-v2.vercel.app/api/orders/${id}`, {
            status: "delivered",
          })
          .then((response) => {
            console.log(response);

            if (response.data.status == "success") {
              Swal.fire(
                "Delivered!",
                "Your file has been delivered.",
                "success"
              );
            }

            setReload(!reload);
          });
      }
    });
  };
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://flifmart-backend-v2.vercel.app/api/orders/${id}`, {
            status: "cancel",
          })
          .then((response) => {
            console.log(response);

            if (response.data.status == "success") {
              Swal.fire("Cancel!", "Your file has been cancel.", "success");
            }

            setReload(!reload);
          });
      }
    });
  };

  return (
    <div className={style.container}>
      <div className={style.checkout}>
        <div className={style.userDetails}>
          <h1 className="uppercase font-bold text-xl">Order Info</h1>
          <hr />
          <br />
          <b> Invoice :</b> {data.invoice}
          <br />
          <br />
          <b> Time :</b> {new Date(data.createdAt).toLocaleTimeString()} -{" "}
          {new Date(data.createdAt).toLocaleDateString()}
          <br />
          <br />
          <b> Name :</b> {data.name}
          <br />
          <br />
          <b>Phone :</b> {data.phone}
          <br />
          <br />
          <b> Address :</b> {data.address}
          <br />
          <br />
          <b>Zip :</b> {data.area}
          <br />
          <br />
          {data?.status != "shipping" ? (
            <>
              {data?.status == "cancel" ? (
                <button className="m-auto bg-gray-300 py-1 px-3 text-white font-bold">
                  This Order is already Cancel
                </button>
              ) : (
                <button className="m-auto bg-gray-300 py-1 px-3 text-white font-bold">
                  This Order is already Delivered
                </button>
              )}
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => handleDelivered(data?._id)}
                className="m-auto bg-cyan-400 py-1 px-3 text-white font-bold"
              >
                Delivered Order
              </button>
              <button
                onClick={() => handleCancel(data?._id)}
                className="m-auto ml-2 bg-red-400 py-1 px-3 text-white font-bold"
              >
                Cancel Order
              </button>
            </>
          )}
        </div>

        <div className={style.details}>
          {data?.products?.map((a) => (
            <>
              <div
                key={a?._id}
                className="flex justify-between items-center m-2 border p-2"
              >
                <img className="w-20 h-20" src={a.productImage} />
                <h1 className="text-2xl font-bold">{a.name}</h1>
                <p className="flex text-lg">
                  {a.cartQuantity} X ৳
                  {a.offeredPrice ? a?.offeredPrice : a?.regularPrice} = ৳
                  {a.cartQuantity *
                    (a.offeredPrice ? a?.offeredPrice : a?.regularPrice)}
                </p>
              </div>
            </>
          ))}
          <hr />
          <div className="flex  justify-around text-2xl text-orange-400">
            Total - ৳{data?.total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
