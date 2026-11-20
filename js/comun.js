function mostrarPantalla(id) {
  var pantallas = document.querySelectorAll(".pantalla");
  for (var i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove("activa");
  }
  document.getElementById(id).classList.add("activa");
}