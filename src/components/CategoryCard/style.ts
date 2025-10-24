import Card from "antd/es/card/Card";
import styled from "styled-components";
import { Image } from "antd/lib";

export const CategoryContainer = styled(Card)`
  height: "100%";
  max-width: 245px;
`;

export const CategoryImage = styled(Image)`
  border-radius: 0 !important;
  max-height: 160px;
  object-fit: cover;
  object-position: center;
`;
