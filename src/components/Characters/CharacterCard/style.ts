import styled from "styled-components";
import Card from "antd/es/card/Card";
import { Typography } from "antd";
import { ThemeMode } from "../../../context/ThemeContext";

export const CharacterContainer = styled(Card)`
  width: 260px;
  margin: 10px;
`;

export const Description = styled(Typography.Paragraph)`
  font-size: 12px;
  font-family: "AURABESH";
  margin-bottom: 8px;
`;

export const InfoGrid = styled.div<{ mode: ThemeMode }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  margin-top: 8px;
  color: ${({ mode }) => (mode === "dark" ? "white" : "black")};
`;

export const InfoLabel = styled.span`
  font-size: 12px;
`;

export const InfoValue = styled.span`
  font-weight: 500;
  font-size: 13px;
`;
