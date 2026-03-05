import React from 'react';


interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }: PokemonCardProps) => {


  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


  return (
    <div
      className="pokemon-card group"
    >
      <div className="aspect-square bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pokemon-yellow opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

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
