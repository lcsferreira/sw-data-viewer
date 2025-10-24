import { Flex, Row, Spin } from "antd";

import MovieCard from "../../components/Movies/MovieCard";
import { BackButton, Container, SearchBar, SearchInput } from "./style";
import Button from "antd/es/button";
import { PaginationContainer } from "./style";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/services/movies";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Movie } from "../../api/models/Movie";
const Movies = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["movies", page, debouncedSearch],
    queryFn: () => getMovies(page, debouncedSearch),
  });

  const movies: Movie[] = response?.results ?? [];
  const total: number = response?.count ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSearch = (value: string): void => {
    setSearch(value);
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
          placeholder="Search for movies"
          onSearch={handleSearch}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <Row justify="center">
        {isLoading && movies.length === 0 && (
          <Flex align="center" gap="middle">
            <Spin size="large" data-testid="spinner" />
          </Flex>
        )}
        {movies &&
          movies.map((movie: Movie) => (
            <MovieCard key={movie.url} loading={isFetching} movie={movie} />
          ))}
      </Row>
      <PaginationContainer
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page: number) => setPage(page)}
        disabled={isFetching}
      />
    </Container>
  );
};

export default Movies;
