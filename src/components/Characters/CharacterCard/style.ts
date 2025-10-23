import styled from "styled-components";
import Card from "antd/es/card/Card";
import Skeleton from "antd/es/skeleton";
import { Typography } from "antd";

export const CharacterContainer = styled(Card)`
  width: 240px;
  margin: 10px;
  height: 400px;
`;

export const SkeletonImage = styled(Skeleton.Image)`
  .ant-skeleton-image {
    height: 300px !important;
    width: 240px !important;
  }
`;

export const Description = styled(Typography.Paragraph)`
  font-size: 12px;
  font-family: "AURABESH";
`;
