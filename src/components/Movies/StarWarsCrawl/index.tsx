import React from "react";
import { Modal } from "antd";
import {
  CrawlContainer,
  CrawlContent,
  EpisodeTitle,
  MovieTitle,
  OpeningCrawl,
  TextContainer,
} from "./style";

interface StarWarsCrawlProps {
  animate: boolean;
  title: string;
  episode: number;
  text: string;
  close: () => void;
}

const StarWarsCrawl: React.FC<StarWarsCrawlProps> = ({
  text,
  episode,
  title,
  animate,
  close,
}) => {
  return (
    <Modal open={animate} footer={null} onCancel={close} width="80vw">
      <CrawlContainer>
        <CrawlContent $animate={animate}>
          <TextContainer>
            <EpisodeTitle>Episode {episode}</EpisodeTitle>
            <MovieTitle level={2}>{title}</MovieTitle>
            <OpeningCrawl>{text}</OpeningCrawl>
          </TextContainer>
        </CrawlContent>
      </CrawlContainer>
    </Modal>
  );
};

export default StarWarsCrawl;
