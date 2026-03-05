import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from './PokemonCard';

const PokemonTeam: React.FC = () => {
  const { team, clearTeam } = usePokemon();

  if (team.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
          MEU TIME POKÉMON
          <span className="text-sm font-normal text-gray-400 ml-2">({team.length}/6)</span>
        </h2>
        <button
          onClick={clearTeam}
          className="text-xs font-bold text-gray-400 hover:text-pokemon-red transition-colors uppercase tracking-widest"
        >
          Liberar todos
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {team.map((p) => (
          <div key={p.name} className="relative group">
            <PokemonCard name={p.name} url={p.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonTeam;
