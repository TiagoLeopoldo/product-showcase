# README - Desafio Pokedéx Online

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de estágiário de Desenvolvimento Web da Infinix. O objetivo é criar uma Pokedéx funcional e performática utilizando tecnologias modernas.

## Tecnologias Utilizadas

- **React 18**: Biblioteca principal para construção da interface.
- **TypeScript**: Para garantir segurança de tipos e melhor experiência de desenvolvimento.
- **TailwindCSS**: Para estilização rápida, responsiva e moderna.
- **Axios**: Para consumo da API REST da PokeAPI.
- **React Router Dom**: Para gerenciamento de rotas dinâmicas.
- **Vite**: Como ferramenta de build, garantindo um ambiente de desenvolvimento ultra-rápido.

## Estrutura de Pastas

A estrutura foi organizada seguindo padrões para escalabilidade e manutenção:

```
src/
├── components/ # Componentes reutilizáveis da interface
├── pages/      # Páginas principais da aplicação (Home e Detalhes)
├── services/   # Configuração e chamadas de API (Axios)
├── types/      # Definições de interfaces TypeScript
├── App.tsx     # Componente raiz com roteador e layout base
├── index.css   # Estilos globais e utilitários do Tailwind
└── main.tsx    # Ponto de entrada da aplicação
```

### Justificativa da Estrutura

- **Modularização**: Separar componentes de páginas permite que a lógica de interface seja reaproveitada em diferentes partes do app.
- **Services**: Centralizar as chamadas de API em um serviço Axios facilita a manutenção de URLs base, interceptores e facilita testes futuros.
- **Types**: Manter as interfaces em um local dedicado garante que o contrato de dados com a API seja respeitado em toda a aplicação, evitando o uso de `any`.

## Soluções Implementadas

### O problema das Imagens na Lista
O endpoint de listagem da PokeAPI (`/pokemon`) não retorna as imagens diretamente. Para resolver isso sem sobrecarregar a rede com centenas de requisições de detalhes na Home, implementei uma lógica que extrai o ID do Pokémon a partir da URL retornada e monta a URL da imagem oficial de alta qualidade armazenada no GitHub do PokeAPI. Isso garante uma Home fluida e visualmente atraente.

### UX & Design
- **Indicadores de Carregamento**: Implementação de um Spinner para mostrar carregamento.
- **Responsividade**: Grid adaptável para Mobile, Tablet e Desktop.
- **Animações**: Uso de efeitos de hover e animações de entrada (`fadeIn`) e flutuação para dar vida à interface.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador em `http://localhost:5173` (padrão do Vite) para acessar a aplicação em desenvolvimento.

### Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento (Vite).
- `npm run build` — gera a versão de produção.
- `npm run preview` — serve a build gerada localmente para verificação.
