/* Borrar logo de carga */
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.cargar');
  for (var i = 1; i <= 8; i++) {
    setTimeout(function() {
      if (i === 9) {
        loadingScreen.style.display = 'none';
      }
    }, i * 1000);
  }
});
/* Desactivar click derecho del mouse */
/*
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
*/
function tipoPantalla() {
  let vtipoPantalla = "";
  let vOrientacion = "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    vtipoPantalla = "movil";
    if (screen.width > screen.height) {
      vOrientacion = "horizontal";
    }
    else {
      vOrientacion = "vertical";
    }
  } else {
    vtipoPantalla = "computadora";
    if (screen.width > screen.height) {
      vOrientacion = "horizontal";
    }
    else {
      vOrientacion = "vertical";
    }
  }
  vtipoPantalla = vtipoPantalla + "|" + vOrientacion;
  return vtipoPantalla;
}
function pInformacion(vtitulo, vcodigo, vcombinacion, vimagen, vColores1, vColores2) {
  // Posicion y Medidas de acuerdo a pantalla y orientacion
  vOrientacion = tipoPantalla();
  if (vOrientacion.includes("movil") && vOrientacion.includes("vertical")) {
    vtop = `${((screen.height / 4) * 3) - 80}` + "px";
    vleft = `${(screen.width / 2) - 150}` + "px";
  }
  else {
    if (vOrientacion.includes("horizontal")) {
      vtop = `${screen.height / 2}` + "px";
      vleft = `${((screen.width / 4) * 3) - 150}` + "px";
    }
  }
  // Crear el elemento contenedor del rectángulo de información
  var contenedor = document.createElement("div");
    contenedor.style.background = "rgba(" + parseInt(vColores2[1]+vColores2[2],16) +", " + parseInt(vColores2[3]+vColores2[4],16) + ", " + parseInt(vColores2[5]+vColores2[6],16) + ", 0.25)";
    contenedor.style.position = "absolute";
    contenedor.style.display = "block";
    contenedor.style.padding = "10px";
    contenedor.style.maxWidth = "300px";
    contenedor.style.left = vleft;
    contenedor.style.top = vtop;
    contenedor.style.overflowWrap = "break-word";
    //contenedor.style.width = "max-content";
    //contenedor.style.height = "max-content";
    contenedor.style.filter = "drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.5))";
    console.log(vleft, vtop);

  // Crear el elemento de cierre
  var cierre = document.createElement("span");
    cierre.innerHTML = "<img id='cImagen'" + "src = '" + vimagen + "'>";
    cierre.style.position = "absolute";
    cierre.style.right = "0px";
    cierre.style.top = "0px";
    cierre.style.width = "20px";
    cierre.style.height = "20px";
    cierre.style.cursor = "pointer";
    cierre.addEventListener("click", function() {
        contenedor.parentNode.removeChild(contenedor);
        return false;
    });
  contenedor.appendChild(cierre);

  // Crear el contenido título + codigo + combinacion
  var titulo = document.createElement("h3");
  titulo.style.position = "flex";
  titulo.style.top = vtop + "px";
  titulo.style.color = "rgb(" + parseInt(vColores1[1]+vColores1[2],16) +", " + parseInt(vColores1[3]+vColores1[4],16) + ", " + parseInt(vColores1[5]+vColores1[6],16) + ")";
  titulo.innerHTML = vtitulo + "<br><br>" + vcodigo + "<br><br>" + vcombinacion;
  contenedor.appendChild(titulo);
  
  // Agregar el contenedor al cuerpo de la página
  document.body.appendChild(contenedor);

  var xImage = document.getElementById('cImagen');
  xImage.style.width = cierre.style.width;
  xImage.style.height = cierre.style.height;
}