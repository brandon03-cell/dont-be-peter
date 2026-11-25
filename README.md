# Don't be Peter

Musical chairs to decide who has to take one for the team. Add the names, the music plays, and when it stops everyone runs for a chair. Whoever is left standing is Peter. The last one sitting wins.

Project for Task 1 (Wheel of doom) of the 2nd year of Web Application Development (DAW), built with HTML, CSS and JavaScript, no libraries.

**Play online:** https://dont-be-peter.vercel.app

<img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556241/salaEscritorio.png" alt="The room with the players around the table" width="700">

## Briefing

**Client:** Sacrificios S.A.

**What they asked for:** a website to fairly choose which developer gets sacrificed, from a list of names. It had to be fun and not the typical wheel.

**Our idea:** musical chairs in a cabin. There is always one chair fewer than players, so in every round someone is left without a seat.

What the website had to do:

- Add and remove names.
- Pick one at random, with no repeats until reset.
- Show the name of the chosen player.
- Show a notice when the last one falls and go back to the start.
- Start screen and reset button.
- Animations, transitions and sound.
- Mobile first, with breakpoints at 768px and 1024px.
- Tests.

## How to play

1. In **¿Quién juega hoy?** (Who plays today?) add between 2 and 12 names (no repeats).
2. In the **jukebox**, choose the song.
3. In the **room**, the music plays and you press **Parar música** (Stop music), or the space bar.
4. The music stops, everyone sits down, and whoever is left without a chair is Peter. Peter doesn't come back.
5. One chair is removed and it repeats until only one player is left.

The list is saved in the browser (localStorage) and **Reiniciar** (Reset) clears it.

## Mockups

We designed it first in Figma, for mobile, tablet and desktop:
https://www.figma.com/design/UFAXnmeFKAYewnPKMSHZ3O/Don%C2%B4t-be-peter

<img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556241/repartoMovil.png" alt="Who plays today? on mobile" height="380"> <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556242/repartoEscritorio.png" alt="Who plays today? on desktop" height="380">

## Team

| | Name | Role | Part |
| --- | --- | --- | --- |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/alba.png" width="40"> | Alba Ruiz de la Vega | Scrum Master | Who plays today? and Tutorial |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/manuel.png" width="40"> | Manuel Vasco López | Developer | Welcome and Room |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/diego.png" width="40"> | Diego José Alonso Arias | Product Owner | Jukebox and alerts |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/brandon.png" width="40"> | Brandon David Chusgo Paico | Developer | Shared base, Menu and Credits |

## How we worked

- Scrum in 2 sprints of 2 weeks, with the board in Trello: https://trello.com/b/Y2Lf474H/dont-be-peter
- Everyone works on their own branch, created from `dev`: `base`, `menu`, `credits`, `players`, `tutorial`, `welcome`, `room`, `jukebox` and `alerts`.
- Changes go into `dev` through pull requests, which Brandon reviews before merging. At the end of each sprint, `dev` is merged into `main`.
- Commits in English, for example `feat(menu): add menu html`.

## Technologies

HTML, CSS and JavaScript · Jest · Figma · Trello · Git and GitHub · Visual Studio Code · Cloudinary (images and sounds) · Google Fonts

## Folders

```
index.html          all the screens
css/                atoms.css, molecules.css and organisms.css (shared styles)
css/screens/        one CSS file per screen
js/                 one JS file per screen, plus game.js (game logic) and common.js
tests/              Jest tests
```

## Tests

```
npm install
npm test
```

There are 16 tests: 10 for the game logic (`juego.test.js`) and 6 for the jukebox (`gramola.test.js`).

## Running it

It is deployed on Vercel: https://dont-be-peter.vercel.app

To run it locally, open `index.html` in the browser. An internet connection is needed because the images and sounds are hosted on Cloudinary.

## Credits

- Music: Juhani Junkala, "Chiptune Adventures" and "Retro Game Music Pack" (CC0).
- Sound effects: Juhani Junkala, "512 Sound Effects (8-bit style)" (CC0).
- Jingles: Kenney, "Music Jingles" (CC0).
- Fonts: Press Start 2P, Silkscreen, Pixelify Sans and VT323 (Google Fonts).
