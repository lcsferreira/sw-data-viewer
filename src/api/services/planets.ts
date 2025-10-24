import api from "../api";
import { Planet } from "../models/Planet";

export async function getPlanets(
  page: number,
  search: string
): Promise<Planet[]> {
  const response = await api.get(`/planets/?page=${page}&search=${search}`);
  return response.data;
}

export async function getPlanet(id: string): Promise<Planet> {
  const response = await api.get(`/planets/${id}`);
  return response.data;
}
