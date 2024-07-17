import React, { useContext, useState } from "react";
import style from "./orderDetails.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Details = ({ data, reload, setReload }) => {
  const handleShipping = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Shipped it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://flifmart-backend-v2.vercel.app/api/orders/${id}`, {
            status: "shipping",
          })
          .then((response) => {
            console.log(response);

            if (response.data.status == "success") {
              Swal.fire("Shipped !", "Your file has been shipped.", "success");
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
          {data?.status == "procced" ? (
            <button
              onClick={() => handleShipping(data?._id)}
              className="m-auto bg-green-400 py-1 px-3 text-white font-bold"
            >
              Shipping Order
            </button>
          ) : (
            <button className="m-auto bg-gray-300 py-1 px-3 text-white font-bold">
              This Order is already Shipped
            </button>
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

        {/* <div className={style.details}>
            <h1 className="w-full p-2 bg-gray-100 text-3xl">আপনার অর্ডার</h1>
            {cart?.map((a) => (
              <>
                <div key={a?._id} className="flex items-center justify-around mt-2 border bg-gray-100">
                  <span
                    className="text-xl text-red-600 cursor-pointer"
                    onClick={() => remove(a._id)}
                  >
                    <RiDeleteBin5Fill />
                  </span>
                  <img className="w-20 p-1" src={a?.productPictures?.img} />
                  <div className="w-6/12">
                    <h1 className="text-xl font-bold">{a?.name}</h1>
                    <p className="font-bold text-orange-600">
                      {" "}
                      <b className="text-black">{a.cartQuantity}</b> X <TbCurrencyTaka className="inline" />
                      {a.offeredPrice ? a.offeredPrice : a.regularPrice}{" "}
                    </p>
                  </div>
                  <div className="flex">
                    <BsFillPlusCircleFill   onClick={()=>addToCart(a?._id, (a?.cartQuantity + 1))} className="text-3xl mr-2 text-green-500 cursor-pointer"/>
                    {
                        a?.cartQuantity == 1 ?  <FaMinusCircle  className="text-3xl text-gray-400 cursor-pointer" /> :  <FaMinusCircle  onClick={()=>addToCart(a?._id, (a?.cartQuantity - 1))} className="text-3xl text-blue-400 cursor-pointer" />
                    }
                   
                  </div>
                </div>
              </>
            ))}

            {cart?.length == 0 ? (
              <p className="text-lg font-bold text-red-600">Empty Cart</p>
            ) : (
              <>
                {" "}
                <hr className="mt-5" />
                <hr />
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  ----
                  <p className="text-red-400"><TbCurrencyTaka className="inline" />{total}</p>
                </div>
              </>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default Details;
