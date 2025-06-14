import {
  ShopOutlined,
  // TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice";
import { CustomButton } from "../custom-button";
import style from "./index.module.css";
import { Paths } from "../../paths";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={style.header}>
      <Space>
        <ShopOutlined className={style.shopIcon} />
        {/* <TeamOutlined className={style.teamIcon} /> */}
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>BrandSpace</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Log out
        </CustomButton>
      ) : (
        <Space>
          <Link to="/register">
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Sign up
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Login
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
