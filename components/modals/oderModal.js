import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import style from "./modal.module.css";
import axios from "axios";
import jwt from "jwt-decode";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";

import { BiTrash } from "react-icons/bi";

const OderModal = ({ openOder, setOpenOrder, id, reload, setReload }) => {
  const router = useRouter();

  const [order, setOrder] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState("");

  const [newName, setNewName] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    status: "",
    notes: "",
  });

  const usersStringfy = Cookies.get("token");
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://flifmart-backend-v2.vercel.app/api/orders/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${usersStringfy}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setOrder(response?.data?.order?.[0]);
        setIsLoading(false);
      });
  }, [id, refetch]);

  const offersPrices = order?.products?.reduce(function (sum, current) {
    const result = sum + current.offeredPrice * current.cartQuantity;
    return result;
  }, 0);

  const update = async () => {
    const name = newName.name ? newName.name : order.name;
    const address = newName.address ? newName.address : order.address;
    const phone = newName.phone ? newName.phone : order.phone;
    const area = fee ? fee : order.area;
    const notes = newName.notes ? newName.notes : order.notes;

    const total = fee == "inside" ? offersPrices + 80 : offersPrices + 120;

    const receivedBy =
      newName.status != "pending"
        ? jwt(usersStringfy)._id
        : "6472d3ffb3b04b789166235e";
    const status = newName.status ? newName.status : order.status;
    const products = order.products;

    const response = await axios.patch(
      `https://flifmart-backend-v2.vercel.app/api/orders/patch/${order?._id}`,
      {
        name,
        address,
        phone,
        area,
        total,
        receivedBy,
        status,
        products,
        notes,
      }
    );

    setOpenOrder(false);
    setReload(!reload);
    setEdit(false);

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleQuantity = async (e) => {
    const id = e.id;
    const productId = e.productId;
    const netAmount = e.oldAmount - parseInt(amount);
    const data = { productId, netAmount, amount };

    const response = await axios.post(
      `https://flifmart-backend-v2.vercel.app/api/orders/quantity/${id}`,
      { data }
    );
    setRefetch(!refetch);
  };

  const handleCancel = (e) => {
    setOpenOrder(false);
  };

  const deleteCart = async (id, orderID) => {
    const response = await axios.post(
      `https://flifmart-backend-v2.vercel.app/api/orders/cart?id=${id}&orderId=${orderID}`
    );
    setRefetch(!refetch);
  };

  return (
    <div>
      <Modal
        title={`Orders`}
        open={openOder}
        width={1000}
        footer={null}
        onCancel={handleCancel}
      >
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <img className="w-24" src="/load.gif" />
          </div>
        ) : (
          <>
            {edit ? (
              <div className={style.container}>
                <div className={style.checkout}>
                  <div className={style.userDetails}>
                    <h1 className="uppercase font-bold text-xl">Order Info</h1>
                    <hr />
                    <br />
                    <b> Invoice :</b> {order?.invoice}
                    <br />
                    <br />
                    <b> Time :</b>{" "}
                    {new Date(order?.createdAt).toLocaleTimeString()} -{" "}
                    {new Date(order?.createdAt).toLocaleDateString()}
                    <br />
                    <br />
                    <b> Name :</b>{" "}
                    <input
                      className="bg-gray-200"
                      defaultValue={order?.name}
                      onChange={(e) =>
                        setNewName({ ...newName, name: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <b>Phone :</b>{" "}
                    <input
                      className="bg-gray-200"
                      defaultValue={order?.phone}
                      onChange={(e) =>
                        setNewName({ ...newName, phone: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <b> Address :</b>{" "}
                    <input
                      className="bg-gray-200"
                      defaultValue={order?.address}
                      onChange={(e) =>
                        setNewName({ ...newName, address: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <b>Area :</b>
                    <select onChange={(e) => setFee(e.target.value)}>
                      <option value={""}>Select Area</option>
                      <option value={"inside"}>Inside of Dhaka</option>
                      <option value={"outside"}>Outside of Dhakas</option>
                    </select>
                    <br />
                    <br />
                    <b> Status : </b>
                    <select
                      className="px-2 bg-green-400 text-white"
                      onChange={(e) =>
                        setNewName({ ...newName, status: e.target.value })
                      }
                    >
                      <option value={""}>Select Status</option>
                      <option value={"pending"}>Pending</option>
                      <option value={"procced"}>Procced</option>
                      <option value={"shipping"}>Shipping</option>
                      <option value={"delivered"}>Delivered</option>
                      <option value={"cancel"}>Cancel</option>
                      <option value={"later"}>Later</option>
                      <option value={"return"}>Return</option>
                    </select>
                    <br />
                    <br />
                    <label className="flex items-start">
                      <b>Add Notes : </b>
                      <textarea
                        onChange={(e) =>
                          setNewName({ ...newName, notes: e.target.value })
                        }
                        className="w-64 bg-gray-200"
                        defaultValue={order?.notes}
                      />
                    </label>
                  </div>

                  <div className={style.details}>
                    <h1 className="uppercase font-bold text-xl">
                      Products Info
                    </h1>
                    <hr />
                    {order?.products?.map((a) => (
                      <div
                        key={a?._id}
                        className="flex justify-between items-center my-2 border"
                      >
                        {order?.products?.length == 1 ? (
                          ""
                        ) : (
                          <BiTrash
                            className="text-xl mx-2 text-red-500 cursor-pointer"
                            onClick={() => deleteCart(a?._id, order._id)}
                          />
                        )}

                        <Link
                          href={`/product/details/${a?._id}`}
                          target="_blank"
                        >
                          <img className="w-20 h-20" src={a.productImage} />
                        </Link>

                        <Link
                          href={`/product/details/${a?._id}`}
                          target="_blank"
                        >
                          <h1 className="text-sm font-bold mx-2">
                            {a?.name?.slice(0, 20)}
                          </h1>
                        </Link>

                        <p className="flex text-xs w-4/12">
                          {a.cartQuantity} X ৳{a.offeredPrice} = ৳
                          {a.cartQuantity * a.offeredPrice}
                        </p>

                        <div className="flex">
                          <input
                            className="w-10 bg-gray-100"
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            min={1}
                            defaultValue={a?.cartQuantity}
                          />

                          <button
                            onClick={() =>
                              handleQuantity({
                                id: order?._id,
                                productId: a?._id,
                                oldAmount: a?.cartQuantity,
                              })
                            }
                            className="text-white bg-red-400"
                          >
                            set
                          </button>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <div className="flex justify-between text-2xl text-orange-400">
                      {/* Total - ৳{order?.total} */}
                      <br />
                      Delivery Fee Total - ৳ {fee == "inside" ? 80 : 120}
                      <br />
                      New Total - ৳
                      {fee == "inside" ? offersPrices + 80 : offersPrices + 120}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Button key="back" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>

                  <Button
                    className="text-white bg-green-400 ml-2"
                    onClick={() => update(true)}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ) : (
              <div className={style.container}>
                <div className={style.checkout}>
                  <div className={style.userDetails}>
                    <h1 className="uppercase font-bold text-xl">Order Info</h1>
                    <hr />
                    <br />
                    <b> Invoice :</b> {order?.invoice}
                    <br />
                    <br />
                    <b> Time :</b>{" "}
                    {new Date(order?.createdAt).toLocaleTimeString()} -{" "}
                    {new Date(order?.createdAt).toLocaleDateString()}
                    <br />
                    <br />
                    <b> Name :</b> {order?.name}
                    <br />
                    <br />
                    <b>Phone :</b> {order?.phone}
                    <br />
                    <br />
                    <b> Address :</b> {order?.address}
                    <br />
                    <br />
                    <b>Area :</b>{" "}
                    {order?.area == "outside"
                      ? "Outside of Dhaka"
                      : "Inside of Dhaka"}
                    <br />
                    <br />
                    <b> Status :</b>
                    <span className="px-2 bg-green-400 text-white">
                      {order?.status}
                    </span>
                    <br />
                    <br />
                    {order?.notes ? (
                      <>
                        {" "}
                        <b> Notes :</b>
                        <span className="px-2 bg-green-400 text-white">
                          {order?.notes}
                        </span>
                      </>
                    ) : (
                      ""
                    )}{" "}
                    <br />
                    <br />
                    {order?.comment ? (
                      <>
                        {" "}
                        <b> Comment :</b>
                        <span className="px-2 bg-orange-400 text-white">
                          {order?.comment}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={style.details}>
                    <h1 className="uppercase font-bold text-xl">
                      Products Info
                    </h1>
                    <hr />
                    {order?.products?.map((a) => (
                      <div
                        key={a?._id}
                        className="flex justify-between items-center my-2 border p-2"
                      >
                        <Link
                          href={`https://dnilam.net/products/${a?._id}`}
                          target="_blank"
                        >
                          {" "}
                          <img className="w-20 h-20" src={a.productImage} />
                        </Link>{" "}
                        <Link
                          href={`https://dnilam.net/products/${a?._id}`}
                          target="_blank"
                        >
                          <h1 className="text-sm font-bold mx-2">
                            {a.name.slice(0, 50)}
                          </h1>{" "}
                        </Link>
                        <p className="flex text-xs w-4/12">
                          {a.cartQuantity} X ৳
                          {a.offeredPrice ? a?.offeredPrice : a?.regularPrice} =
                          ৳
                          {a.cartQuantity *
                            (a.offeredPrice
                              ? a?.offeredPrice
                              : a?.regularPrice)}
                        </p>
                      </div>
                    ))}
                    <hr />
                    <div className="flex justify-around text-2xl text-orange-400">
                      Total - ৳{order?.total}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Button
                    key="back"
                    onClick={() => {
                      setOpenOrder(false),
                        setNewName({
                          name: "",
                          phone: "",
                          address: "",
                          area: "",
                          status: "",
                        });
                    }}
                  >
                    Cancel
                  </Button>

                  {router?.asPath == "/orders/delivered/delivered" ? (
                    ""
                  ) : (
                    <Button
                      className="text-white bg-red-400 ml-2"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default OderModal;
