import api from "../api";
import { Character } from "../models/Character";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getCharacters(
  page: number,
  search: string
): Promise<ApiResponse<Character>> {
  const response = await api.get(`/people/?page=${page}&search=${search}`);
  return response.data;
}

export async function getCharacter(id: string): Promise<Character> {
  const response = await api.get(`/people/${id}/`);
  return response.data;
}
