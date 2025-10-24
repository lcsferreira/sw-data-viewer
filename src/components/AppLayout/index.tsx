import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Button, Switch, Tooltip, Drawer, Grid } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
  FolderOpenFilled,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteLayout } from "../../routes/style";
import { ContentWrapper, SpanTitle } from "./style";
import { useTheme } from "../../context/ThemeContext";

const { Header, Sider, Content } = Layout;

type MenuItem = {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { key: "home", label: "Home", path: "/", icon: <HomeOutlined /> },
  {
    key: "characters",
    label: "Characters",
    path: "/characters",
    icon: <TeamOutlined />,
  },
  {
    key: "movies",
    label: "Movies",
    path: "/movies",
    icon: <FolderOpenFilled />,
  },
];

function getMenuKeyByPath(pathname: string): string {
  const found = menuItems.find((item) => item.path === pathname);
  // se a rota for /movies/:id, retorna o key do menu de filmes
  if (pathname.includes("/movies/")) {
    return "movies";
  }
  if (pathname.includes("/characters/")) {
    return "characters";
  }
  if (!found) {
    throw new Error(`Rota não mapeada no menu: ${pathname}`);
  }
  return found.key;
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mode, toggleMode } = useTheme();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const selectedKeys = useMemo(() => {
    return [getMenuKeyByPath(pathname)];
  }, [pathname]);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <RouteLayout>
      <Layout style={{ minHeight: "100vh" }}>
        {!isMobile && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            theme={mode === "dark" ? "light" : "dark"}
          >
            <div
              style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: mode === "dark" ? "white" : "black",
              }}
            >
              <SpanTitle mode={mode}>SW</SpanTitle>
            </div>
            <Menu
              theme={mode === "dark" ? "light" : "dark"}
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
        )}
        {isMobile && (
          <Drawer
            placement="left"
            width="100%"
            open={!collapsed}
            onClose={() => setCollapsed(true)}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: mode === "dark" ? "white" : "black",
                background: mode === "dark" ? "#141414" : "#ffffff",
              }}
            >
              <SpanTitle mode={mode}>SW</SpanTitle>
            </div>
            <Menu
              theme={mode === "dark" ? "light" : "dark"}
              mode="inline"
              selectedKeys={selectedKeys}
              items={menuItems.map((item) => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
              }))}
              onClick={({ key }) => {
                const target = menuItems.find((i) => i.key === key);
                if (target) {
                  navigate(target.path);
                }
                setCollapsed(true);
              }}
            />
          </Drawer>
        )}
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0,0,0,0.45)",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((c) => !c)}
              style={{ fontSize: 18, width: 42, height: 42 }}
            />
            {/* <HeaderTitle>Star Wars Visual Guide</HeaderTitle> */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Tooltip title={mode === "dark" ? "Light" : "Dark"}>
                <Switch
                  checked={mode === "dark"}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                  onChange={() => toggleMode()}
                />
              </Tooltip>
            </div>
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
