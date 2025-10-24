import Card from "antd/es/card/Card";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";

export const ContentError = styled(Content)`
  display: flex;
  justify-content: center;
`;

export const CardError = styled(Card)`
  width: 50%;
`;

export const MovieDetailContainer = styled(Content)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;
