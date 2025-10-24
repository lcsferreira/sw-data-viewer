// StarWarsCrawl.tsx

import React from "react";
// ...seus imports de style
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
  // 'width' não é mais necessário para trocar o layout
  close: () => void;
}

const StarWarsCrawl: React.FC<StarWarsCrawlProps> = ({
  text,
  episode,
  title,
  animate,
  close,
}) => {
  // Remove o 'if (width < 768)'
  // O componente agora SEMPRE renderiza o Modal.
  // O Modal já é responsivo por padrão.
  return (
    <Modal
      open={animate}
      footer={null}
      onCancel={close}
      width="80vw" /* Opcional: ajustar largura */
    >
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
