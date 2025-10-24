import api from "../api";
import { Specie } from "../models/Species";

export async function getSpecies(
  page: number,
  search: string
): Promise<Specie[]> {
  const response = await api.get(`/species/?page=${page}&search=${search}`);
  return response.data;
}

export async function getSpecie(id: string): Promise<Specie> {
  const response = await api.get(`/species/${id}`);
  return response.data;
}
