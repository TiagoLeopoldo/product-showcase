import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PokemonListItem } from '../types/pokemon';

interface PokemonContextType {
  team: PokemonListItem[];
  addToTeam: (pokemon: PokemonListItem) => void;
  removeFromTeam: (name: string) => void;
  isInTeam: (name: string) => boolean;
  clearTeam: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<PokemonListItem[]>(() => {
    const savedTeam = localStorage.getItem('pokemon-team');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokemon-team', JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon: PokemonListItem) => {
    if (team.length >= 6) {
      alert('Seu time está cheio! (Máximo 6 Pokémons)');
      return;
    }
    if (!team.find(p => p.name === pokemon.name)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (name: string) => {
    setTeam(team.filter(p => p.name !== name));
  };

  const isInTeam = (name: string) => {
    return team.some(p => p.name === name);
  };

  const clearTeam = () => {
    setTeam([]);
  };

  return (
    <PokemonContext.Provider value={{ team, addToTeam, removeFromTeam, isInTeam, clearTeam }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
