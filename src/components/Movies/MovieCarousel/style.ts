import { Card, Image } from "antd"; // Import the Image component from antd
import Carousel from "antd/lib/carousel";
import styled from "styled-components";

export const CharacterMoviesContainer = styled(Card)`
  width: 60%;
`;

// export const CarouselContainer = styled(Carousel)`
//   margin: 0 auto;
//   max-width: 400px;
// `;

export const CarouselImage = styled(Image)`
  border-radius: 0 !important;
  max-width: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
`;

export const CarouselContainer = styled(Carousel)<{ $mode: string }>`
  margin: 0 auto;
  max-width: 400px;
  .slick-dots li button {
    background-color: ${({ $mode }) =>
      $mode === "light" ? "#00000080" : "#ffffff80"} !important;
  }

  .slick-dots li.slick-active::after {
    background: ${({ $mode }) =>
      $mode === "light" ? "#000" : "#fff"} !important;
  }
`;

export const CarouselCard = styled(Card)<{ $mode: string }>`
  border-color: ${({ $mode }) =>
    $mode === "light" && "rgba(5, 5, 5, 0.26)"} !important;
`;
