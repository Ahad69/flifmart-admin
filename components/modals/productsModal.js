import { Button, Modal, Radio, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductModal = ({ open, setOpen, id }) => {
  const [product, setProduct] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);

  const editorRef = useRef(null);
  const [desc, setDesc] = useState(null);

  const log = () => {
    if (editorRef.current) {
      setDesc(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://flifmart-backend-v2.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data?.data?.products?.[0]);
        setIsLoading(false);
      });
  }, [id, reload]);

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
  const usersStringfy = Cookies.get("token");

  const inSubmit = async (values) => {
    values.preventDefault();
    setLoading(true);
    const user = jwt(usersStringfy);

    const name = values.target.productname.value;
    const category = values.target.proCat.value;
    const videoLink = values.target.videolink.value;
    const regularPrice = values.target.regPrice.value;
    const offeredPrice = values.target.offPrice.value;
    const quantity = values.target.quantity.value;
    const hotDeal = values.target.hot.value;
    const description = desc ? desc : product?.description;
    const uploadedBy = user?._id;
    const productImage = "";

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
      videoLink,
    };

    if (fileList?.[0]?.originFileObj) {
      console.log(fileList?.[0]?.originFileObj);

      //new
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
    }

    try {
      console.log(data);
      await axios
        .patch(
          `https://flifmart-backend-v2.vercel.app/api/products/${product?._id}`,
          data,
          {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${usersStringfy}`,
            },
          }
        )

        .then((res) =>
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })
        );

      setDesc(null);
      setReload(!reload);
      setLoading(false);
      setEdit(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={`${edit ? "Update Products" : "Product Details"}`}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={false}
      >
        <p>
          {isloading ? (
            "loading"
          ) : (
            <>
              <hr />
              {edit ? (
                <div>
                  <div>
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
                    <form onSubmit={inSubmit}>
                      <label>
                        Product Name :
                        <input
                          className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
                          name="productname"
                          defaultValue={product?.name}
                        />
                      </label>
                      <br />
                      <br />
                      <label>
                        Product Video Link :
                        <input
                          className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
                          name="videolink"
                          defaultValue={product?.videoLink}
                        />
                      </label>
                      <br />
                      <br />
                      <label>
                        Product Category :
                        <select
                          name="proCat"
                          className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
                          defaultValue={product?.category}
                        >
                          <option value={"মাছের-ফিড"}>মাছের ফিড</option>
                          <option value={"মাছের-ঔষুধ"}>মাছের ঔষুধ</option>
                          <option value={"গরুর-খাবার"}>গরুর খাবার</option>
                          <option value={"ছাদ-কৃষি"}> ছাদ কৃষি</option>
                          <option value={"উন্নত-বীজ"}>উন্নত বীজ</option>
                          <option value={"কৃষি-যন্ত্রপাতি"}>
                            কৃষি যন্ত্রপাতি
                          </option>
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
                          defaultValue={product?.regularPrice}
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
                          defaultValue={product?.offeredPrice}
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
                          defaultValue={product?.quantity}
                        />
                      </label>

                      <br />
                      <br />
                      <label>
                        Hot Deal :
                        <Radio.Group name="hot" defaultValue={product?.hotDeal}>
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
                          initialValue={product?.description}
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
                          Submitting..
                        </button>
                      ) : (
                        <button
                          className="text-white bg-red-600 py-1 px-3 rounded mt-5 font-bold"
                          type="submit"
                        >
                          {" "}
                          Submit{" "}
                        </button>
                      )}
                    </form>
                    <br />
                    <Button
                      key="back"
                      onClick={() => {
                        setOpen(false), setEdit(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    className="w-48 h-48 block m-auto border border-red-400 p-2"
                    src={product?.productImage}
                  ></img>
                  <p className="mb-1">
                    <b> Name : </b> {product?.name}
                  </p>
                  <p className="mb-1">
                    <b> Product Video Link : </b> {product?.videoLink}
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
                  <Button key="back" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>

                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </p>
      </Modal>
    </>
  );
};
export default ProductModal;
