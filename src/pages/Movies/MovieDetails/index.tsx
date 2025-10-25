import { Layout, Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../api/services/movies";
import { getCharacter } from "../../../api/services/characters";
import { MovieDetailContainer, CardError, ContentError } from "./style";
import MovieDetail from "../../../components/Movies/MovieDetail";
import Lists from "../../../components/Lists";
import type { Movie } from "../../../api/models/Movie";
import type { Character } from "../../../api/models/Character";

const { Paragraph } = Typography;

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  // 1️⃣ Busca principal: o filme
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5min cache
  });

  // 2️⃣ Busca dependente: personagens
  const {
    data: characters = [],
    isLoading: charactersLoading,
    error: charactersError,
  } = useQuery<Character[]>({
    queryKey: ["characters", movie?.url.match(/\d+/)?.[0]],
    queryFn: async () => {
      if (!movie?.characters) return [];
      const ids = movie.characters
        .map((url) => url.match(/\d+/)?.[0])
        .filter(Boolean);
      return Promise.all(ids.map((id) => getCharacter(id!)));
    },
    enabled: !!movie?.characters,
    staleTime: 1000 * 60 * 10,
  });

  if (movieError || charactersError) {
    return (
      <Layout>
        <ContentError>
          <CardError title="Error">
            <p>Failed to load movie or characters.</p>
          </CardError>
        </ContentError>
      </Layout>
    );
  }

  return (
    <Layout>
      <MovieDetailContainer>
        {/* Skeleton para UX melhor */}
        {movieLoading && <Skeleton active paragraph={{ rows: 8 }} />}
        {movie && (
          <>
            <MovieDetail movie={movie} loading={movieLoading} movieId={id!} />
            <Lists
              title="Characters"
              items={characters}
              renderItem={(item: Character) => (
                <Paragraph key={item.url}>{item.name}</Paragraph>
              )}
              loading={charactersLoading}
              error={charactersError ? "Error loading characters" : ""}
              linkTo="/characters"
            />
          </>
        )}
      </MovieDetailContainer>
    </Layout>
  );
};

export default MovieDetails;
