import { Col, Row, Typography, Image, Descriptions, Button } from "antd";
import { Movie } from "../../../api/models/Movie";
import { BackButton, MovieDetailCard } from "./style";
import StarWarsCrawl from "../StarWarsCrawl";
import { useState } from "react";
import PlayCircleFilled from "@ant-design/icons/lib/icons/PlayCircleFilled";
import StopFilled from "@ant-design/icons/lib/icons/StopFilled";
import dayjs from "dayjs";
import useWindowDimensions from "../../../hooks/useWindowDimensios";
import { useTheme } from "../../../context/ThemeContext";

interface MovieDetailProps {
  movie: Movie;
  loading?: boolean;
  movieId: string;
}

const MovieDetail = ({ movie, loading, movieId }: MovieDetailProps) => {
  const [playOpeningCrawl, setPlayOpeningCrawl] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const { mode } = useTheme();
  return (
    <>
      <MovieDetailCard
        title={
          <Typography.Title
            level={2}
            ellipsis={{ rows: 1 }}
            style={{ marginBottom: 0, fontSize: width > 900 ? "24px" : "16px" }}
          >
            {movie?.title}
          </Typography.Title>
        }
        extra={
          <BackButton mode={mode} to="/movies">
            Back
          </BackButton>
        }
        loading={loading}
      >
        <Row gutter={[16, 16]}>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={6}
            xl={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src={`/films/${movieId}.jpg`}
              alt={movie?.title}
              style={{
                width: "100%",
                maxHeight: width > 900 ? "600px" : "300px",
                objectFit: "cover",
                objectPosition: "center",
                alignSelf: "center",
              }}
            />
          </Col>
          <Col span={18} xs={24} sm={24} md={18} lg={18} xl={18}>
            <Descriptions
              bordered
              size="small"
              column={1}
              layout={width > 900 ? "horizontal" : "vertical"}
            >
              <Descriptions.Item label="Director">
                {movie?.director}
              </Descriptions.Item>
              <Descriptions.Item label="Producer">
                <Typography.Paragraph>{movie?.producer}</Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Release Date">
                {dayjs(movie.release_date).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Episode">
                {movie?.episode_id}
              </Descriptions.Item>
              <Descriptions.Item label="Opening Crawl">
                <Button
                  type="primary"
                  icon={
                    playOpeningCrawl ? <StopFilled /> : <PlayCircleFilled />
                  }
                  onClick={() => setPlayOpeningCrawl(!!!playOpeningCrawl)}
                >
                  {playOpeningCrawl ? "Stop" : "Play"}
                </Button>
                {playOpeningCrawl && (
                  <StarWarsCrawl
                    close={() => setPlayOpeningCrawl(false)}
                    animate={playOpeningCrawl}
                    text={movie.opening_crawl}
                    episode={movie.episode_id}
                    title={movie.title}
                  />
                )}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </MovieDetailCard>
    </>
  );
};

export default MovieDetail;
