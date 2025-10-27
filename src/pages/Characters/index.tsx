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
          onChange={handleSearchChange}
          value={search}
        />
      </SearchBar>
      <Row justify="center">
        {isLoading && characters.length === 0 && (
          <Flex align="center" gap="middle">
            <Spin size="large" data-testid="spinner" />
          </Flex>
        )}
        {characters.map((character: Character) => (
          <CharacterCard
            key={character.url}
            character={character}
            loading={isFetching}
          />
        ))}
      </Row>
      <PaginationContainer
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
        disabled={isFetching}
      />
    </Container>
  );
};

export default Characters;
