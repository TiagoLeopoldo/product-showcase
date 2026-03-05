import axios from 'axios';
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

const CACHE_PREFIX = 'poke-cache-';

const getCache = <T,>(key: string): T | null => {
  const cached = localStorage.getItem(CACHE_PREFIX + key);
  if (cached) {
    return JSON.parse(cached) as T;
  }
  return null;
};

const setCache = <T,>(key: string, data: T) => {
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
};

export const clearCache = () => {
  Object.keys(localStorage)
    .filter(key => key.startsWith(CACHE_PREFIX))
    .forEach(key => localStorage.removeItem(key));
};

export const getPokemonList = async (limit: number = 151): Promise<PokemonListResponse> => {
  const cacheKey = `list-${limit}`;
  const cached = getCache<PokemonListResponse>(cacheKey);
  if (cached) return cached;

  const response = await api.get<PokemonListResponse>(`pokemon?limit=${limit}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export const getPokemonDetails = async (name: string): Promise<PokemonDetail> => {
  const cacheKey = `detail-${name}`;
  const cached = getCache<PokemonDetail>(cacheKey);
  if (cached) return cached;

  const response = await api.get<PokemonDetail>(`pokemon/${name}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export default api;
