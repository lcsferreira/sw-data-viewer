import { Card, Image } from "antd"; // Import the Image component from antd
import Carousel from "antd/lib/carousel";
import styled from "styled-components";

export const CharacterMoviesContainer = styled(Card)`
  width: 60%;
`;

export const CarouselContainer = styled(Carousel)`
  margin: 0 auto;
  max-width: 400px;
`;

export const CarouselImage = styled(Image)`
  border-radius: 0 !important;
`;
