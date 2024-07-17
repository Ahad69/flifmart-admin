import Layout from "@/components/layout/layout";
import { Pagination, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Bloglist = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [reload, setReload] = useState(false);
  const [total, setTotal] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const usersStringfy = Cookies.get("token");
  async function myblogs() {
    try {
      const response = await axios.get(
        `https://flifmart-backend-v2.vercel.app/api/blog?page=${current}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );

      setBlogs(response.data.blogs);
      setTotal(response?.data?.total);
      //   setStartIndex(response.data.startIndex);
      setIsloading(false);
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }
  }
  useEffect(() => {
    setIsloading(true);
    myblogs();
  }, [current, reload]);

  const deleteNow = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://flifmart-backend-v2.vercel.app/api/blog/${id}`, {
            headers: {
              authorization: `Bearer ${usersStringfy}`,
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            setReload(!reload);
          });
      }
    });
  };

  const editNow = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/blogs/edit?id=${id}`);
      }
    });
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img className="w-[75px] h-[50px]" src={image} />,
    },
    {
      title: "Created At",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <div className="flex gap-5">
          <button
            onClick={() => editNow(id)}
            className="bg-blue-600 px-2 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNow(id)}
            className="bg-red-600 px-2 text-white"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = [];
  const datr = blogs?.map((a, index) =>
    data.push({
      key: `${a._id}`,
      index: `${index + 1}`,
      name: `${a?.title?.slice(0, 50)}`,
      id: `${a?._id}`,
      time: `${new Date(a?.createdAt).toLocaleString()}`,
      image: `${a?.featuredImage}`,
    })
  );
  const onPage = (value) => {
    setCurrent(value);
  };

  return (
    <Layout>
      <div>
        <Table
          loading={isloading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <br />
        <Pagination
          onChange={onPage}
          pageSize={12}
          defaultCurrent={current}
          total={total}
        />
      </div>
    </Layout>
  );
};

export default Bloglist;
