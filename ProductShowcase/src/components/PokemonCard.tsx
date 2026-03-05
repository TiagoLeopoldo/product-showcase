import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }: PokemonCardProps) => {
  const navigate = useNavigate();
  const { addToTeam, removeFromTeam, isInTeam } = usePokemon();

  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const isFavorite = isInTeam(name);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromTeam(name);
    } else {
      addToTeam({ name, url });
    }
  };

  return (
    <div
      className="pokemon-card group"
      onClick={() => navigate(`/pokemon/${name}`)}
    >
      <div className="aspect-square bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pokemon-yellow opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

        <button
          onClick={toggleFavorite}
          className={`absolute top-2 left-2 z-20 p-2 rounded-full transition-all duration-300 ${isFavorite
              ? 'bg-pokemon-yellow text-white scale-110 shadow-md'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-300 hover:text-pokemon-yellow hover:scale-110'
            }`}
        >
          Incluir
        </button>

        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 text-xs font-bold text-gray-400 group-hover:text-pokemon-red transition-colors">
          #{id?.padStart(3, '0')}
        </span>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold capitalize text-center text-gray-700 dark:text-gray-200 group-hover:text-pokemon-blue transition-colors">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default PokemonCard;
