import Card from "antd/es/card/Card";
import styled from "styled-components";
import { Image } from "antd/lib";

export const CategoryContainer = styled(Card)`
  height: "100%";
`;

export const CategoryImage = styled(Image)`
  border-radius: 0 !important;
  max-width: 245px;
  max-height: 160px;
  object-fit: cover;
  object-position: center;
`;
