import { useParams } from "react-router-dom";
import { getCharacter } from "../../../api/services/characters";
import type { Character } from "../../../api/models/Character";
import { Layout, Spin } from "antd";
import CharacterDetail from "../../../components/Characters/CharacterDetail";
import MovieCarousel from "../../../components/Movies/MovieCarousel";
import { CardError, CharacterDetailContainer, ContentError } from "./style";
import { useQuery } from "@tanstack/react-query";

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading: loading,
    error: characterError,
  } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id!),
  });

  if (characterError) {
    return (
      <Layout>
        <ContentError>
          <CardError title="Erro">
            <p>{characterError}</p>
          </CardError>
        </ContentError>
      </Layout>
    );
  }

  return (
    <Layout>
      <CharacterDetailContainer>
        {loading && !character && <Spin size="large" />}
        {character && id && (
          <CharacterDetail character={character} loading={loading} />
        )}
        {character && id && (
          <>
            <MovieCarousel loading={loading} filmsUrls={character.films} />
          </>
        )}
      </CharacterDetailContainer>
    </Layout>
  );
};

export default CharacterDetails;
