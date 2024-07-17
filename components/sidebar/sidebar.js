import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "dashboard"),
  getItem("Products", "products", [
    getItem("Products List", "products/products-list"),
    getItem("Add Product", "products/add-products"),
  ]),

  getItem("Orders", "order", [
    // getItem("Confirm Order", "orders"),
    getItem("All Orders", "orders/all"),
    getItem("Pending Orders", "orders/pending-orders"),
    getItem("Procced Orders", "orders/received/orders"),
    getItem("Shipping Orders", "orders/shipping/shipping-orders"),
    getItem("Completed Orders", "orders/delivered/delivered"),
    getItem("Cancel Orders", "orders/cancel/orders"),
    getItem("Later Orders", "orders/later/later"),
    getItem("Return Orders", "orders/return/orders"),
  ]),
  getItem("Transaction", "transactions"),
  getItem("Users", "users", [
    getItem("Users List", "user/users-list"),
    getItem("Add User", "user/add-user"),
  ]),
  getItem("Blogs", "blogs", [
    getItem("Blogs List", "blogs/bloglist"),
    getItem("Add Blog", "blogs/add-blogs"),
  ]),
  getItem("Reports", "reports"),
  getItem("Gallery", "gallery", [
    getItem("Video Gallery", "gallery/video-gallery"),
    getItem("Photo Gallery", "gallery/photo-gallery"),
  ]),
  getItem("Management Team", "management-team"),
];

const Sidebar = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(`/${e.key}`);
  };

  return (
    <>
      <Menu
        className="sm:w-full mx-auto"
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[`${router.asPath.slice(1, 50)}`]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default Sidebar;
