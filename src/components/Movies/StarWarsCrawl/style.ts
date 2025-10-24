import { Typography } from "antd";
import styled, { css, keyframes } from "styled-components";

const crawlAnimation = keyframes`
  0% {
    transform: translateY(0%) rotateX(20deg);
  }
  100% {
    transform: translateY(-100%) rotateX(20deg);
  }
`;

export const CrawlContainer = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  min-width: 200px;
  height: 200px;
  overflow: hidden;
  background: black;
  color: yellow;
  font-family: "Arial", sans-serif;
`;

export const CrawlContent = styled.div<{ $animate: boolean }>`
  position: absolute;
  perspective: 730px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.$animate &&
    css`
      animation: ${crawlAnimation} 60s linear;
    `}
`;

export const TextContainer = styled.div`
  width: 30%;
  margin: 0 30px;
  text-align: justify;
  font-size: 15px;
  transform: rotateX(50deg);
`;

export const EpisodeTitle = styled(Typography.Paragraph)`
  color: yellow !important;
  font-family: "Star Jedi", sans-serif;
  text-align: center;
  font-size: 18px;
`;

export const MovieTitle = styled(Typography.Title)`
  color: yellow !important;
  font-family: "Star Jedi", sans-serif;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
`;

export const OpeningCrawl = styled(Typography.Paragraph)`
  color: yellow;
  font-family: "Star Jedi", sans-serif;
`;
