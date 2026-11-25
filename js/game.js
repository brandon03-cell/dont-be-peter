let maxPlayers = 12;
let minPlayers = 2;

let faces = {
  alba: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/alba.png",
  brandon: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/brandon.png",
  daniel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/daniel.png",
  diego: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/diego.png",
  isabel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/isabel.png",
  "jose luis": "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/joseLuis.png",
  juanjo: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/juanjo.png",
  julian: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/julian.png",
  manuel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/manuel.png",
  nerea: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/nerea.png",
  paloma: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/paloma.png",
  rafa: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/rafa.png"
};

let genericFaces = [
  "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/gorraAzul.png",
  "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/peloNaranja.png",
  "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/pinchosRojo.png",
  "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/coletas.png"
];

let colors = ["#3b6fd4", "#d43b3b", "#3ba84a", "#e88ac0", "#f2c230", "#8a5cd4"];

let sample = ["Brandon", "Alba", "Diego", "Manuel", "Julián", "Paloma"];

function removeAccents(text) {
  text = text.toLowerCase();
  text = text.replace(/á/g, "a");
  text = text.replace(/é/g, "e");
  text = text.replace(/í/g, "i");
  text = text.replace(/ó/g, "o");
  text = text.replace(/ú/g, "u");
  return text;
}

function cleanName(name) {
  return name.trim();
}

function isDuplicate(list, name) {
  for (let i = 0; i < list.length; i++) {
    if (removeAccents(list[i]) == removeAccents(name)) {
      return true;
    }
  }
  return false;
}

function validateName(list, name) {
  name = cleanName(name);
  if (name == "") {
    return "Escribe un nombre.";
  }
  if (name.length > 15) {
    return "El nombre es muy largo (máximo 15 letras).";
  }
  if (isDuplicate(list, name)) {
    return "Ese nombre ya está en la hoja.";
  }
  if (list.length >= maxPlayers) {
    return "Ya hay " + maxPlayers + " candidatos, no caben más.";
  }
  return "";
}

function addName(list, name) {
  let newList = list.slice();
  newList.push(cleanName(name));
  return newList;
}

function removeName(list, position) {
  let newList = list.slice();
  newList.splice(position, 1);
  return newList;
}

function canPlay(list) {
  return list.length >= minPlayers;
}

function chairCount(list) {
  if (list.length == 0) {
    return 0;
  }
  return list.length - 1;
}

function pickPeter(list) {
  return Math.floor(Math.random() * list.length);
}

function isLastRound(list) {
  return list.length == 2;
}

function isGameOver(list) {
  return list.length <= 1;
}

function faceOf(name, position) {
  let key = removeAccents(cleanName(name));
  if (faces[key]) {
    return faces[key];
  }
  return genericFaces[position % genericFaces.length];
}

function colorOf(position) {
  return colors[position % colors.length];
}

if (typeof module != "undefined") {
  module.exports = {
    maxPlayers: maxPlayers,
    sample: sample,
    removeAccents: removeAccents,
    cleanName: cleanName,
    isDuplicate: isDuplicate,
    validateName: validateName,
    addName: addName,
    removeName: removeName,
    canPlay: canPlay,
    chairCount: chairCount,
    pickPeter: pickPeter,
    isLastRound: isLastRound,
    isGameOver: isGameOver,
    faceOf: faceOf,
    colorOf: colorOf
  };
}