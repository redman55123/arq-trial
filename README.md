# Pacman - HTML5 Game

Um jogo Pacman colorido construído com HTML5 Canvas e JavaScript.

## Funcionalidades

- **Pacman** em amarelo vibrante com animação de boca
- **3 níveis** progressivamente maiores e mais complexos:
  - **Nível 1**: Labirinto pequeno com poucos fantasmas e pellets
  - **Nível 2**: Labirinto médio com mais fantasmas, pellets e obstáculos
  - **Nível 3**: Labirinto grande com muitos fantasmas, pellets, obstáculos e power-ups
- **Seleção de níveis** a qualquer momento
- **Controles**:
  - Teclado: setas e WASD
  - Touch: D-pad virtual para mobile
- **Placar** com pontuação, vidas e recordes por nível (persistidos em localStorage)

## Como jogar

1. Abra `index.html` no navegador ou use um servidor local:
   ```bash
   python3 -m http.server 8080
   ```
2. Acesse `http://localhost:8080`
3. Escolha um nível e comece a jogar!
4. Colete todos os pellets (amarelos) e power-ups (roxos) para vencer
5. Use power-ups para comer fantasmas por pontos extras

## Tecnologias

- HTML5 Canvas
- JavaScript (ES6+)
- CSS3
