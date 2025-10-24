import { useParams } from "react-router-dom";
import { getCharacter } from "../../../api/services/characters";
import { useEffect, useState } from "react";
import type { Character } from "../../../api/models/Character";
import { Layout, Spin } from "antd";
import CharacterDetail from "../../../components/Characters/CharacterDetail";
import MovieCarousel from "../../../components/Movies/MovieCarousel";
import { CardError, CharacterDetailContainer, ContentError } from "./style";

const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const loadCharacter = async (id: string) => {
    try {
      setLoading(true);
      const characterData = await getCharacter(id);
      setCharacter(characterData);
    } catch (error) {
      setError("Erro ao carregar personagem");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  if (error) {
    return (
      <Layout>
        <ContentError>
          <CardError title="Erro">
            <p>{error}</p>
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
