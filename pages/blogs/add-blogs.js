import Layout from "@/components/layout/layout";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Upload } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const AddBlogs = () => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [desc, setDesc] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const log = () => {
    if (editorRef.current) {
      setDesc(editorRef.current.getContent());
    }
  };
  const usersStringfy = Cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = e.target.title.value;
    const category = e.target.category.value;
    const description = desc;

    const data = {
      title,
      category,
      description,
      featuredImage: "",
    };

    const formData = new FormData();
    formData.append("images", fileList?.[0]?.originFileObj);

    await fetch("https://flifmart-backend-v2.vercel.app/api/files2/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        data.featuredImage = result.url;
      });

    try {
      await axios
        .post("https://flifmart-backend-v2.vercel.app/api/blog", data, {
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
        router.push("/blogs/bloglist");
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <Head>
          <title>Add Blogs</title>
        </Head>
        <div className="bg-white m-5 p-5">
          <h1 className="text-2xl font-bold">Add Blog</h1>
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
          <form onSubmit={handleSubmit}>
            <label>
              Title :
              <input
                className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
                name="title"
                placeholder="Title"
              />
            </label>
            <br />
            <br />
            <label>
              Product Category :
              <select
                name="category"
                className="w-full p-1 bg-gray-100  border-b-4 border-red-300"
              >
                <option value={""}>--Select Category--</option>
                <option value={"মাছের-ফিড"}>মাছের ফিড</option>
                <option value={"মাছের-ঔষুধ"}>মাছের ঔষুধ</option>
                <option value={"গরুর-খাবার"}>গরুর খাবার</option>
                <option value={"ছাদ-কৃষি"}> ছাদ কৃষি</option>
                <option value={"উন্নত-বীজ"}>উন্নত বীজ</option>
                <option value={"কৃষি-যন্ত্রপাতি"}>কৃষি যন্ত্রপাতি</option>
                <option value={"জৈব-সার"}>জৈব সার</option>
              </select>
            </label>
            <br />
            <br />

            <label>
              Description :
              <Editor
                onBlur={log}
                apiKey="85y33d08bi5k84w3nxa07aq607ko8v165dau2joyygooce9j"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="Description"
                init={{
                  height: 350,
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
    </div>
  );
};

export default AddBlogs;
//
