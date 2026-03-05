import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';
import type { PokemonDetail, PokemonType, PokemonStat } from '../types/pokemon';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePokemon } from '../context/PokemonContext';

const Details: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToTeam, removeFromTeam, isInTeam } = usePokemon();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!name) return;
      try {
        setLoading(true);
        const data = await getPokemonDetails(name);
        setPokemon(data);
      } catch (err) {
        setError('Falha ao carregar os detalhes do Pokémon.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [name]);

  if (loading) return <LoadingSpinner />;
  if (error || !pokemon) return (
    <div className="text-center py-10 space-y-4">
      <p className="text-red-500 font-bold text-xl">{error || 'Pokémon não encontrado'}</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-pokemon-red text-white rounded-full hover:bg-red-600 transition-colors"
      >
        Voltar
      </button>
    </div>
  );

  const officialArtwork = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const isFavorite = isInTeam(pokemon.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromTeam(pokemon.name);
    } else {
      addToTeam({ name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/` });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-pokemon-blue font-bold hover:text-blue-700 transition-colors group"
      >
        <span className="border-b-2 border-transparent group-hover:border-pokemon-blue">Voltar para a Pokédex</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
        <div className="md:w-1/2 p-8 bg-gray-50 dark:bg-gray-700 flex items-center justify-center relative">
          <div className="absolute top-4 left-4 text-4xl font-black text-gray-200 dark:text-gray-600 select-none">
            #{String(pokemon.id).padStart(3, '0')}
          </div>
          <img
            src={officialArtwork}
            alt={pokemon.name}
            className="w-full max-w-xs relative z-10 drop-shadow-2xl animate-float"
          />
        </div>

        <div className="md:w-1/2 p-8 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-5xl font-black capitalize text-gray-800 dark:text-white tracking-tight">
              {pokemon.name}
            </h2>
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-2xl transition-all duration-300 ${isFavorite
                  ? 'bg-pokemon-yellow text-white shadow-lg scale-110'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-pokemon-yellow hover:bg-white dark:hover:bg-gray-600'
                }`}
            >
              Incluir
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((t: PokemonType) => (
              <span
                key={t.type.name}
                className={`type-badge type-${t.type.name} px-4 py-1.5 shadow-sm`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 dark:border-gray-700">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Altura</p>
              <p className="text-2xl font-bold">{(pokemon.height / 10).toFixed(1)} <span className="text-sm font-normal text-gray-400 ml-1Resource">m</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Peso</p>
              <p className="text-2xl font-bold">{(pokemon.weight / 10).toFixed(1)} <span className="text-sm font-normal text-gray-400 ml-1">kg</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Estatísticas Básicas</h3>
            <div className="space-y-3">
              {pokemon.stats.map((s: PokemonStat) => (
                <div key={s.stat.name} className="space-y-1">
                  <div className="flex justify-between text-xs uppercase font-bold text-gray-500">
                    <span>{s.stat.name.replace('-', ' ')}</span>
                    <span>{s.base_stat}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 bg-pokemon-yellow`}
                      style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
