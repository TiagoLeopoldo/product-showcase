import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import { PokemonProvider } from './context/PokemonContext'

function App() {
  return (
    <PokemonProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-pokemon-red p-6 shadow-md mb-8">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white tracking-tighter">
              POKEDÉX <span className="text-pokemon-yellow">ONLINE</span>
            </h1>
          </div>
        </header>

        <main className="container mx-auto px-4 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<Details />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-auto">
          <p className="text-center text-sm opacity-75">
            Projeto Pokedéx Online - por Tiago de Noronha Leopoldo Dados da PokeAPI.co
          </p>
        </footer>
      </div>
    </PokemonProvider>
  )
}

export default App
