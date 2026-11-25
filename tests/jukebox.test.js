let jukebox = require("../js/jukebox.js");

test("codes go in pages of 4", function () {
  expect(jukebox.songCode(0, 4)).toBe("A1");
  expect(jukebox.songCode(3, 4)).toBe("A4");
  expect(jukebox.songCode(4, 4)).toBe("B1");
  expect(jukebox.songCode(9, 4)).toBe("C2");
});

test("calculates how many pages are needed", function () {
  expect(jukebox.totalPages(9, 4)).toBe(3);
  expect(jukebox.totalPages(8, 4)).toBe(2);
  expect(jukebox.totalPages(0, 4)).toBe(1);
});

test("knows which page each song is on", function () {
  expect(jukebox.pageOf(0, 4)).toBe(0);
  expect(jukebox.pageOf(5, 4)).toBe(1);
});

test("after the last one it goes back to the first", function () {
  expect(jukebox.nextPosition(2, 9)).toBe(3);
  expect(jukebox.nextPosition(8, 9)).toBe(0);
});

test("before the first one it goes to the last", function () {
  expect(jukebox.previousPosition(3, 9)).toBe(2);
  expect(jukebox.previousPosition(0, 9)).toBe(8);
});

test("formats the time as minutes:seconds", function () {
  expect(jukebox.formatTime(0)).toBe("0:00");
  expect(jukebox.formatTime(65)).toBe("1:05");
  expect(jukebox.formatTime(74.9)).toBe("1:14");
  expect(jukebox.formatTime(NaN)).toBe("0:00");
});