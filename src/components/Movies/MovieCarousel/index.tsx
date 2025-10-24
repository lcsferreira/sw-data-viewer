import { Card } from "antd";
import {
  CarouselCard,
  CarouselContainer,
  CarouselImage,
  CharacterMoviesContainer,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../api/services/movies";
import { Movie } from "../../../api/models/Movie";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

interface MovieCarouselProps {
  loading: boolean;
  filmsUrls: string[];
}

const MovieCarousel = ({ loading, filmsUrls }: MovieCarouselProps) => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const {
    data: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", filmsUrls],
    queryFn: async () => {
      return Promise.all(
        filmsUrls.map((url) => getMovie(url.match(/\d+/)?.[0]!))
      );
    },
    enabled: !!filmsUrls,
    staleTime: 1000 * 60 * 10,
  });

  const handleClick = (movie: Movie) => {
    navigate(`/movies/${movie.url.match(/\d+/)?.[0]}`);
  };

  return (
    <CharacterMoviesContainer title="Appearances in movies" loading={loading}>
      <CarouselContainer arrows dots $mode={mode}>
        {movies.map((movie) => (
          <CarouselCard
            onClick={() => handleClick(movie)}
            $mode={mode}
            key={movie.episode_id}
            title={movie.title}
            loading={moviesLoading}
            cover={
              <CarouselImage
                src={`/films/${movie.url.match(/\d+/)?.[0]}.jpg`}
                alt={movie.title}
                preview={false}
                onError={(e) => {
                  e.currentTarget.src = `placeholder.jpg`;
                }}
              />
            }
          />
        ))}
      </CarouselContainer>
    </CharacterMoviesContainer>
  );
};

export default MovieCarousel;
