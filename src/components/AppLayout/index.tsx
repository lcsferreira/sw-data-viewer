import React, { useMemo, useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteLayout } from "../../routes/style";
import { HeaderTitle, ContentWrapper, SpanTitle } from "./style";

const { Header, Sider, Content } = Layout;

type MenuItem = {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { key: "home", label: "Início", path: "/", icon: <HomeOutlined /> },
  {
    key: "characters",
    label: "Personagens",
    path: "/characters",
    icon: <TeamOutlined />,
  },
];

function getMenuKeyByPath(pathname: string): string {
  const found = menuItems.find((item) => item.path === pathname);
  if (!found) {
    throw new Error(`Rota não mapeada no menu: ${pathname}`);
  }
  return found.key;
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedKeys = useMemo(() => {
    return [getMenuKeyByPath(pathname)];
  }, [pathname]);

  return (
    <RouteLayout>
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          theme="light"
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            <SpanTitle>SW</SpanTitle>
          </div>
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={selectedKeys}
            style={{ borderInlineEnd: "none" }}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
            onClick={({ key }) => {
              const target = menuItems.find((i) => i.key === key);
              if (!target) {
                throw new Error(`Item de menu desconhecido: ${String(key)}`);
              }
              navigate(target.path);
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0,0,0,0.45)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((c) => !c)}
              style={{ fontSize: 18, width: 42, height: 42 }}
            />
            {/* <HeaderTitle>Star Wars Visual Guide</HeaderTitle> */}
          </Header>
          <Content>
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
          </Content>
        </Layout>
      </Layout>
    </RouteLayout>
  );
}
