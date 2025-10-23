import api from "../api";
import { Movie } from "../models/Movie";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getMovies(
  page: number,
  search: string
): Promise<ApiResponse<Movie>> {
  const response = await api.get(`/films/?page=${page}&search=${search}`);
  return response.data;
}

export async function getMovie(id: string): Promise<Movie> {
  const response = await api.get(`/films/${id}`);
  return response.data;
}
