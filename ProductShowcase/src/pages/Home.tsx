import React, { useEffect, useState } from 'react';
import { getPokemonList, clearCache } from '../services/api';
import type { PokemonListItem } from '../types/pokemon';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchPokemon = async (forceRefresh = false) => {
    try {
      setLoading(true);
      if (forceRefresh) clearCache();
      const data = await getPokemonList(151);
      setPokemon(data.results);
    } catch (err) {
      setError('Falha ao buscar os Pokémons. Por favor, tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p: PokemonListItem) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="text-center py-10">
      <p className="text-red-500 font-bold text-xl">{error}</p>
      <button
        onClick={() => fetchPokemon(true)}
        className="mt-4 px-6 py-2 bg-pokemon-red text-white rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );

  return (
    <div className="space-y-12">

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="relative flex-1 w-full group">
          <input
            type="text"
            placeholder="Pesquisar Pokémon por nome..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-50 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-pokemon-yellow focus:bg-white dark:focus:bg-gray-800 outline-none transition-all shadow-inner"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
            TODOS OS POKÉMONS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.length > 0 ? (
            filteredPokemon.map((p: PokemonListItem) => (
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 text-lg italic">Nenhum Pokémon encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
