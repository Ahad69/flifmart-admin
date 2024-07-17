import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import style from "./invoice.module.css";
import { Watermark } from "antd";

const PDF = ({ ids, setLoader }) => {
  const [order, setOrder] = useState();

  async function fetchData() {
    await axios
      .get(`https://flifmart-backend-v2.vercel.app/api/orders/${ids}`)
      .then((response) => {
        const data = response.data.data.order?.[0];
        setOrder(data);
        if (data?._id == ids) {
          console.log(data?._id, ids);
        }
      })
      .then(() =>
        setTimeout(() => {
          downloadPDF();
        }, 1000)
      )
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!ids) {
      return;
    }
    fetchData();
  }, [ids]);

  const downloadPDF = () => {
    const capture = global.document.querySelector(".pdf");
    console.log(capture);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("order.pdf");
    });
  };

  return (
    <div className="flex justify-center">
      <div
        className="pdf border border-red-400  border-4 bg-gray-200  mx-10 p-5 "
        style={{ width: "650px" }}
      >
        <Watermark height={30} width={130} content="D nilam Invoice">
          <img className="m-auto mt-5" src="/logo.png" />
          <hr className="border-gray-400 mt-5 mb-5" />

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold uppercase text-orange-500">
                Invoice
              </h1>
              <p>
                <b>invoice : </b>
                {order?.invoice}
              </p>
              <p>
                <b>Date : </b>{" "}
                {new Date(order?.createdAt).toDateString() +
                  " " +
                  new Date(order?.createdAt).toLocaleTimeString()}
              </p>
              <p>
                <b>Payment : </b>Cash on Delivery
              </p>
            </div>
            <div className="text-end">
              <h1 className="text-2xl font-bold text-orange-500 uppercase">
                Ship To
              </h1>
              <p>
                <b>Name : </b>
                {order?.name}
              </p>
              <p>
                <b>Phone : </b>
                {order?.phone}
              </p>
              <p>
                <b>Address : </b>
                {order?.address}
              </p>
            </div>
          </div>
          <hr className="border-gray-400 mt-5 mb-5" />
          <div className="w-full">
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.map((a) => (
                  <tr>
                    <td>{a.name}</td>
                    <td> {a.cartQuantity}</td>
                    <td>
                      ৳{a.offeredPrice ? a?.offeredPrice : a?.regularPrice}
                    </td>
                    <td>
                      ৳
                      {a.cartQuantity *
                        (a.offeredPrice ? a?.offeredPrice : a?.regularPrice)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td className="font-bold">Total</td>
                  <td className="font-bold"> ৳{order?.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-gray-400 mt-5 mb-5" />
          <b>Receiver</b>
          <p>
            {order?.receivedBy?.[0].firstName +
              " " +
              order?.receivedBy?.[0].lastName}
          </p>
          <p>{order?.receivedBy?.[0].email}</p>
          <br />
          <div className="w-52 h-24 bg-white"></div>
          <p className="text-center font-bold mt-24">Thank You</p>
          <p className="text-center font-bold">See You Again</p>
        </Watermark>
      </div>
    </div>
  );
};

export default PDF;
