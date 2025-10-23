import Layout from "antd/es/layout/layout";
import Header from "antd/es/layout/layout";
import Content from "antd/es/layout/layout";
import Footer from "antd/es/layout/layout";
import styled from "styled-components";

export const Container = styled(Layout)`
  background-color: transparent;
  min-height: 90vh;
`;

export const HomeTitle = styled(Header)`
  color: white;
  font-size: 24px;
  text-align: center;
  background-color: transparent;
  padding: 50px 50px 0 50px;
  height: auto;
`;

export const HomeContent = styled(Content)`
  padding: 50px;
`;

export const HomeFooter = styled(Footer)`
  text-align: center;
  background-color: transparent;
  color: white;
  padding: 0 50px 50px 50px;
`;

export const SpanTitle = styled.span`
  color: #bc1e22;
  font-size: 32px;
  font-family: "SFDistantGalaxy-Regular";
`;
