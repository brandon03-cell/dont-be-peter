var gramola = require("../js/gramola.js");

test("los códigos van por páginas de 4", function () {
  expect(gramola.codigoCancion(0, 4)).toBe("A1");
  expect(gramola.codigoCancion(3, 4)).toBe("A4");
  expect(gramola.codigoCancion(4, 4)).toBe("B1");
  expect(gramola.codigoCancion(9, 4)).toBe("C2");
});

test("calcula cuántas páginas hacen falta", function () {
  expect(gramola.totalPaginas(9, 4)).toBe(3);
  expect(gramola.totalPaginas(8, 4)).toBe(2);
  expect(gramola.totalPaginas(0, 4)).toBe(1);
});

test("sabe en qué página está cada canción", function () {
  expect(gramola.paginaDe(0, 4)).toBe(0);
  expect(gramola.paginaDe(5, 4)).toBe(1);
});

test("después de la última vuelve a la primera", function () {
  expect(gramola.siguientePosicion(2, 9)).toBe(3);
  expect(gramola.siguientePosicion(8, 9)).toBe(0);
});

test("antes de la primera va a la última", function () {
  expect(gramola.anteriorPosicion(3, 9)).toBe(2);
  expect(gramola.anteriorPosicion(0, 9)).toBe(8);
});

test("pone el tiempo como minutos:segundos", function () {
  expect(gramola.formatearTiempo(0)).toBe("0:00");
  expect(gramola.formatearTiempo(65)).toBe("1:05");
  expect(gramola.formatearTiempo(74.9)).toBe("1:14");
  expect(gramola.formatearTiempo(NaN)).toBe("0:00");
});