import { Movie } from "../../../api/models/Movie";
import { Image } from "antd/lib";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { MovieContainer } from "./style";
import dayjs from "dayjs";

interface MovieCardProps {
  movie: Movie;
  loading: boolean;
}

const MovieCard = ({ movie, loading }: MovieCardProps) => {
  const id = movie.url.match(/\d+/)?.[0];
  return (
    <Link to={`/movies/${id}`}>
      <MovieContainer
        title={`Episode ${movie.episode_id}`}
        hoverable
        loading={loading}
        cover={
          // loading ? (
          //   <Image alt={movie.title} src={`placeholder.jpg`} preview={false} />
          // ) : (
          <Image
            alt={movie.title}
            src={`/films/${id}.jpg`}
            onError={(e) => {
              e.currentTarget.src = `placeholder.jpg`;
            }}
            preview={false}
          />
          // )
        }
      >
        <Meta
          title={movie.title}
          description={dayjs(movie.release_date).format("DD/MM/YYYY")}
        />
      </MovieContainer>
    </Link>
  );
};

export default MovieCard;
