import Layout from "antd/es/layout/layout";
import Header from "antd/es/layout/layout";
import Content from "antd/es/layout/layout";
import Footer from "antd/es/layout/layout";
import styled from "styled-components";
import { ThemeMode } from "../../context/ThemeContext";

export const Container = styled(Layout)`
  background-color: transparent;
  min-height: 90vh;
`;

export const HomeTitle = styled(Header)<{ mode?: ThemeMode }>`
  color: ${(props) => (props.mode === "dark" ? "white" : "black")};
  font-size: 24px;
  text-align: center;
  background-color: transparent;
  padding: 50px 50px 0 50px;
  height: auto;
`;

export const HomeContent = styled(Content)`
  padding: 50px;
`;

export const HomeFooter = styled(Footer)<{ mode?: ThemeMode }>`
  color: ${(props) => (props.mode === "dark" ? "white" : "black")};
  text-align: center;
  background-color: transparent;
  padding: 0 50px 50px 50px;
`;

export const SpanTitle = styled.span<{ mode?: ThemeMode }>`
  color: ${(props) => (props.mode === "dark" ? "#bc1e22" : "#1a387d")};
  font-size: 32px;
  font-family: "SFDistantGalaxy-Regular";
`;
