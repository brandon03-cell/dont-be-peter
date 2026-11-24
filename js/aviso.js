let modoDialogo = "";
let cuentaAtras = 0;
let relojFinal = null;

function abrirDialogo(titulo, texto, boton, final, cara) {
  document.getElementById("dialogoTitulo").textContent = titulo;
  document.getElementById("dialogoTexto").textContent = texto;
  document.getElementById("dialogoBoton").textContent = boton;
  document.getElementById("dialogoCara").src = cara;
  if (final) {
    document.getElementById("cajaDialogo").classList.add("dialogoFinal");
    document.getElementById("dialogoSello").textContent = "Gana";
  } else {
    document.getElementById("cajaDialogo").classList.remove("dialogoFinal");
    document.getElementById("dialogoSello").textContent = "Peter";
    document.getElementById("dialogoCuenta").textContent = "";
  }
  document.getElementById("dialogo").classList.add("abierto");
  document.getElementById("dialogoBoton").focus();
}

function cerrarDialogo() {
  document.getElementById("dialogo").classList.remove("abierto");
  clearInterval(relojFinal);
}

function empezarCuentaAtras() {
  cuentaAtras = 10;
  document.getElementById("dialogoCuenta").textContent = "Volviendo al inicio en " + cuentaAtras;
  relojFinal = setInterval(function () {
    cuentaAtras = cuentaAtras - 1;
    document.getElementById("dialogoCuenta").textContent = "Volviendo al inicio en " + cuentaAtras;
    if (cuentaAtras == 0) {
      cerrarDialogo();
      irAlMenu();
    }
  }, 1000);
}

document.getElementById("dialogoBoton").addEventListener("click", function () {
  sonar("clic");
  cerrarDialogo();
  if (modoDialogo == "peter") {
    siguienteRonda();
  } else {
    empezarPartida();
  }
});