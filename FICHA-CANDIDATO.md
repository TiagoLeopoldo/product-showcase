# Ficha do Candidato

## Seção 1: Instruções para rodar

**Quais variáveis de ambiente são necessárias?**  
Acredito que não seria necessário usar variáveis de ambiente, já que a API é pública.  
Para mostrar noção de padronização, criei a variável `PKM_API`, mas ela não foi publicada no repositório, pois estava adicionado ao `.gitignore`. E adicionei a variável ambiente ao fazer deploy no Vercel.

**Como instalar dependências?**  
Para instalar as dependências do projeto, precisa abrir o terminal na pasta raiz e executar:  
```bash
npm install
```  
É necessário ter o Node v18+ instalado e entrar na pasta onde está o `package.json` do projeto e rodar o comando.

**Como rodar o projeto?**  
Depois de instalar as dependências, precisa executar:  
```bash
npm run dev
```  
Esse comando inicia o servidor de desenvolvimento do Vite (definido nos scripts do `package.json`).

---

## Seção 2: Decisões de design

**Por que escolheu essa estrutura de pastas?**  
Optei por essa organização de pastas para deixar o código mais fácil de manter e escalar. Separar componentes da estrutura de layout ajuda outros desenvolvedores a se localizar no projeto. Também gosto de separar tipagens, porque misturar tudo deixa o código confuso. A pasta `services` faz sentido ficar isolada, já que requisições são serviços e devem estar separadas para facilitar manutenção.

**Qual foi a maior dificuldade e como superou?**  
A parte que mais me desafiou foi configurar as versões dependências que costumo usar para desenvolver sem dar erro. No fim, consegui resolver com sucesso.

**O que não deu tempo de fazer e como faria com mais tempo?**  
Não implementei o botão de atualizar. Cheguei a começar, mas achei desnecessário, já que a página renderiza todos os Pokémons de uma vez. Além disso, ao incluir ou excluir do time, a lista já atualiza automaticamente.

---

## Seção 3: Link para Deploy (Bônus)

[https://pokedex-online-bay.vercel.app/](https://pokedex-online-bay.vercel.app/)

---

## Seção final: Recomendações

Acho que esse desafio é ótimo para medir a proficiência de quem está começando, como eu. O projeto é legal, é conhecido e bom para treinar principalmente requisições de API, então quem já praticou algumas vezes consegue entender melhor o caminho.  
Seria interessante se fosse disponibilizado um **figma** ou outra ferramenta de design usada pela empresa, junto com os requisitos principais apenas, para deixar o desafio ainda mais próximo da realidade.


