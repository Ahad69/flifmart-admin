import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Details = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://flifmart-backend-v2.vercel.app/api/products/${router.query.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data?.data?.products?.[0]);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div>
        {loading ? (
          "loadng"
        ) : (
          <div>
            <img
              className="w-6/12 h-96 block m-auto border border-red-400 p-2"
              src={product.productImage}
            ></img>
            <p className="mb-1">
              <b> Name : </b> {product.name}
            </p>
            <p className="mb-1">
              <b> Category : </b> {product?.category}
            </p>
            <p className="mb-1">
              <b> Quantity : </b> {product?.quantity}
            </p>
            <p className="mb-1">
              <b> Regular Price : </b> {product?.regularPrice}
            </p>
            <p className="mb-1">
              <b> Offered Price : </b> {product?.offeredPrice}
            </p>
            <p className="mb-1">
              <b> Uploaded At : </b>
              {new Date(product?.createdAt).toLocaleTimeString()} -{" "}
              {new Date(product?.createdAt).toLocaleDateString()}
            </p>
            <label>
              <b>Description : </b>
              <div
                className="mb-5 text-sm"
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              ></div>
            </label>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Details;
