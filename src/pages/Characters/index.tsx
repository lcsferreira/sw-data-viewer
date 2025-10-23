import { useState } from "react";
import { Character } from "../../api/models/Character";
import { useDebounce } from "../../hooks/useDebounce";
import { getCharacters } from "../../api/services/characters";
import {
  BackButton,
  Container,
  PaginationContainer,
  SearchBar,
  SearchInput,
} from "./style";
import { Button, Flex, Row, Spin } from "antd";
import CharacterCard from "../../components/Characters/CharacterCard";
import { useQuery } from "@tanstack/react-query";

const Characters = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["characters", page, debouncedSearch],
    queryFn: () => getCharacters(page, debouncedSearch),
    // (Opcional, mas ótimo para UX de paginação)
    // Mantém os dados antigos visíveis enquanto os novos carregam
    // keepPreviousData: true,
  });

  const characters: Character[] = response?.results ?? [];
  const total: number = response?.count ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Container>
      <SearchBar>
        <BackButton to="/">
          <Button type="primary" color="primary">
            Back
          </Button>
        </BackButton>
        <SearchInput
          placeholder="Search for characters"
          onChange={handleSearchChange} // Só precisamos do onChange agora
          value={search} // Controlamos o input
        />
      </SearchBar>
      <Row justify="center">
        {/* 5. Usamos o 'isLoading' para o primeiro carregamento */}
        {isLoading && characters.length === 0 && (
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        )}
        {/* Renderizamos os personagens. 
          Se 'keepPreviousData' for true, os personagens antigos
          continuam aqui enquanto os novos carregam, o que é ótimo!
        */}
        {characters.map((character: Character) => (
          <CharacterCard
            key={character.url}
            character={character} // Passamos 'isFetching' para o card se ele precisar // mostrar um skeleton ou algo do tipo
            loading={isFetching}
          />
        ))}
      </Row>
      <PaginationContainer
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setPage(page)} // Desabilitamos enquanto uma nova página está sendo buscada
        disabled={isFetching}
      />
    </Container>
  );
};

export default Characters;
