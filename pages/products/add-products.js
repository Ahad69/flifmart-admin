import Layout from "@/components/layout/layout";
import { Form, Input, Modal, Radio, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import Head from "next/head";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = () => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [desc, setDesc] = useState(null);
  const [loading, setLoading] = useState(false);

  const log = () => {
    if (editorRef.current) {
      setDesc(editorRef.current.getContent());
    }
  };

  const usersStringfy = Cookies.get("token");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = async (values) => {
    values.preventDefault();
    setLoading(true);

    const user = jwt(usersStringfy);

    const name = values.target.productname.value;
    const videoLink = values.target.videoLink.value ?? "";
    const category = values.target.proCat.value;
    const regularPrice = values.target.regPrice.value;
    const offeredPrice = values.target.offPrice.value;
    const quantity = values.target.quantity.value;
    const hotDeal = values.target.hot.value;
    const description = desc;
    const uploadedBy = user?._id;
    const productImage = "";

    const discount = [(regularPrice - offeredPrice) / regularPrice] * 100;

    const data = {
      name,
      category,
      regularPrice,
      offeredPrice,
      quantity,
      hotDeal,
      description,
      uploadedBy,
      productImage,
      discount,
      videoLink,
    };

    // const config = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     Connection: "keep-alive",
    //     "Content-Type": "application/json",
    //   },
    //   body: formData,
    // };

    // const response = await axios
    //   .post("https://api.imgbb.com/1/upload", formData, {
    //     params: {
    //       key: "7d965c14f60ad42c713edd79e80b17e3",
    //     },
    //   })
    //   .then((response) => {
    //     data.productImage = response.data.data.url;
    //   });

    // imagekit
    setLoading(false);
    const formData = new FormData();
    formData.append("images", fileList?.[0]?.originFileObj);

    await fetch("https://flifmart-backend-v2.vercel.app/api/files/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        data.productImage = result.url;
      });

    try {
      await axios
        .post("https://flifmart-backend-v2.vercel.app/api/products", data, {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${usersStringfy}`,
          },
        })
        .then((res) =>
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })
        );
      setLoading(false);
      setTimeout(() => {
        router.push("/products/products-list");
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add Product</title>
      </Head>
      <div className="m-5 p-5 bg-white">
        <h1 className="text-3xl font-bold">Add Products</h1>

        <hr />
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
        >
          {fileList.length < 1 && "+ Picture"}
        </Upload>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        <br />
        <form onSubmit={onFinish}>
          <label>
            Product Name :
            <input
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              name="productname"
            />
          </label>
          <br />
          <br />
          <label>
            Product Video Id :
            <input
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              name="videoLink"
            />
          </label>
          <br />
          <br />
          <label>
            Product Category :
            <select
              name="proCat"
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
            >
              <option value={"মাছের-ফিড"}>মাছের ফিড</option>
              <option value={"মাছের-ঔষুধ"}>মাছের ঔষুধ</option>
              <option value={"গরুর-খাবার"}>গরুর খাবার</option>
              <option value={"ছাদ-কৃষি"}> ছাদ কৃষি</option>
              <option value={"উন্নত-বীজ"}>উন্নত বীজ</option>
              <option value={"কৃষি-যন্ত্রপাতি"}>কৃষি যন্ত্রপাতি</option>
              <option value={"জৈব-সার"}>জৈব সার</option>
              <option value={"অন্যান্য"}>অন্যান্য</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Regular Price :
            <input
              type="number"
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              name="regPrice"
            />
          </label>
          <br />
          <br />
          <label>
            Offered Price :
            <input
              type="number"
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              name="offPrice"
            />
          </label>
          <br />
          <br />
          <label>
            Total Quantity :
            <input
              type="number"
              className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              name="quantity"
            />
          </label>

          <br />
          <br />
          <label>
            Hot Deal :
            <Radio.Group name="hot">
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </Radio.Group>
          </label>
          <br />
          <br />
          <label>
            Description :
            <Editor
              onBlur={log}
              apiKey="lsomljxr6jq719eep6p1gnkb6648rvtp291uwsy43kesby4m"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="Description"
              init={{
                height: 250,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "insertfile image media pageembed template link anchor codesample | bold italic forecolor | alignleft aligncenter " +
                  "undo redo | blocks | " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                image_caption: true,
                image_advtab: true,
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;  }",
                relative_urls: true,
              }}
            />{" "}
          </label>
          {loading ? (
            <button className="text-white bg-red-400 py-1 px-3 rounded mt-5 font-bold">
              {" "}
              Submitting..{" "}
            </button>
          ) : (
            <button
              className="text-white bg-red-400 py-1 px-3 rounded mt-5 font-bold"
              type="submit"
            >
              {" "}
              Submit{" "}
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
