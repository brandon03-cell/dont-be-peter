# Don't be Peter

El juego de las sillas para decidir a quién le toca sacrificarse. Se apuntan los nombres, suena la música y cuando se para todos corren a una silla. El que se queda de pie es Peter. Gana el último que queda sentado.

Proyecto de la Tarea 1 (Wheel of doom) de 2º DAW, hecho con HTML, CSS y JavaScript sin librerías.

<img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556241/salaEscritorio.png" alt="La sala con los jugadores alrededor de la mesa" width="700">

## Briefing

**Cliente:** Sacrificios S.A.

**Qué nos pidieron:** una web para elegir de forma justa qué desarrollador se sacrifica, a partir de una lista de nombres. Que fuera divertida y que no fuera la típica ruleta.

**Nuestra idea:** el juego de las sillas en una cabaña. Siempre hay una silla menos que jugadores, así que en cada ronda alguien se queda sin sitio.

Lo que tenía que hacer la web:

- Añadir y quitar nombres.
- Elegir uno al azar, sin que repita hasta reiniciar.
- Avisar con el nombre del elegido.
- Avisar cuando cae el último y volver al inicio.
- Pantalla de inicio y botón de reiniciar.
- Animaciones, transiciones y sonido.
- Mobile first, con puntos de quiebre en 768px y 1024px.
- Tests.

## Cómo se juega

1. En **¿Quién juega hoy?** se apuntan de 2 a 12 nombres (no se pueden repetir).
2. En la **gramola** se elige la canción.
3. En la **sala** suena la música y se pulsa **Parar música** (o la barra espaciadora).
4. La música se frena, todos se sientan y el que se queda sin silla es Peter. Peter ya no vuelve a salir.
5. Se quita una silla y se repite hasta que solo queda uno.

La lista se guarda en el navegador (localStorage) y **Reiniciar** la borra.

## Maquetas

El diseño lo hicimos primero en Figma, en móvil, tablet y escritorio:
https://www.figma.com/design/UFAXnmeFKAYewnPKMSHZ3O/Don%C2%B4t-be-peter

<img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556241/repartoMovil.png" alt="¿Quién juega hoy? en móvil" height="380"> <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795556242/repartoEscritorio.png" alt="¿Quién juega hoy? en escritorio" height="380">

## Equipo

| | Nombre | Rol | Parte |
| --- | --- | --- | --- |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/alba.png" width="40"> | Alba Ruiz de la Vega | Scrum Master | ¿Quién juega hoy? y Tutorial |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/manuel.png" width="40"> | Manuel Vasco López | Desarrollo | Welcome y Sala |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/diego.png" width="40"> | Diego José Alonso Arias | Product Owner | Gramola y avisos |
| <img src="https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/brandon.png" width="40"> | Brandon David Chusgo Paico | Desarrollo | Base común, Menú y Créditos |

## Cómo trabajamos

- Scrum en 2 sprints de 2 semanas, con el tablero en Trello: https://trello.com/b/Y2Lf474H/dont-be-peter
- Cada uno trabaja en su rama, que sale de `dev`: `base`, `menu`, `credits`, `players`, `tutorial`, `welcome`, `room`, `jukebox` y `alerts`.
- Los cambios entran en `dev` por pull request, y Brandon las revisa antes de juntarlas. Al final de cada sprint, `dev` pasa a `main`.
- Commits en inglés, por ejemplo `feat(menu): add menu html`.

## Tecnologías

HTML, CSS y JavaScript · Jest · Figma · Trello · Git y GitHub · Visual Studio Code · Cloudinary (imágenes y sonidos) · Google Fonts

## Carpetas

```
index.html          todas las pantallas
css/                atomos.css, moleculas.css y organismos.css (lo común)
css/pantallas/      un CSS por pantalla
js/                 un JS por pantalla, más juego.js (la lógica) y comun.js
tests/              tests de Jest
```

## Tests

```
npm install
npm test
```

Son 16 tests: 10 de la lógica del juego (`juego.test.js`) y 6 de la gramola (`gramola.test.js`).

## Abrirlo

Abrir `index.html` en el navegador. Hace falta internet porque las imágenes y los sonidos están en Cloudinary.

## Créditos

- Música: Juhani Junkala, "Chiptune Adventures" y "Retro Game Music Pack" (CC0).
- Efectos: Juhani Junkala, "512 Sound Effects (8-bit style)" (CC0).
- Jingles: Kenney, "Music Jingles" (CC0).
- Fuentes: Press Start 2P, Silkscreen, Pixelify Sans y VT323 (Google Fonts).
