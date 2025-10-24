import { Card } from "antd";
import {
  CarouselContainer,
  CarouselImage,
  CharacterMoviesContainer,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../api/services/movies";
import { Movie } from "../../../api/models/Movie";

interface MovieCarouselProps {
  loading: boolean;
  filmsUrls: string[];
}

const MovieCarousel = ({ loading, filmsUrls }: MovieCarouselProps) => {
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

  return (
    <CharacterMoviesContainer title="Aparições em filmes" loading={loading}>
      <CarouselContainer arrows autoplay dots>
        {movies.map((movie) => (
          <Card
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
          ></Card>
        ))}
      </CarouselContainer>
    </CharacterMoviesContainer>
  );
};

export default MovieCarousel;
