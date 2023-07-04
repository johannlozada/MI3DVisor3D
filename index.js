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
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  }
}
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
function obtenerLink1(vLink){ //Obtener la ruta completa archivo GLTF
  var contar = 0;
  var start = 0;
  vNuevaCadena = vLink;
  vNuevoLink = 'https://raw.githubusercontent.com/';
  while ((start = vLink.indexOf("/", start) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/')+1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (contar == 3 || contar == 4 || contar > 5){
          vNuevoLink = vNuevoLink + vCadena;
      }
      contar++;
  }
  vNuevoLink = vNuevoLink + vNuevaCadena;
  return vNuevoLink;
}
function obtenerLink2(vLink){ //Obtener la ruta de la "carpeta" donde se encuentra el GLTF
  var contar = 0;
  var start = 0;
  vNuevaCadena = vLink;
  vNuevoLink = 'https://raw.githubusercontent.com/';
  while ((start = vLink.indexOf("/", start) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/')+1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (contar == 3 || contar == 4 || contar == 6 || contar == 7){
          vNuevoLink = vNuevoLink + vCadena;
      }
      contar++;
  }
  return vNuevoLink;
}
function pInformacion(vtitulo, vcodigo, vcombinacion, vimagen, vColores1, vColores2) {
  // Posicion y Medidas de acuerdo a pantalla y orientacion
  vOrientacion = tipoPantalla();
  if (vOrientacion.includes("movil") && vOrientacion.includes("vertical")) {
    vtop = "75%";
    vleft = "50%";
    vmaxWidth = "60%";
  }
  if (vOrientacion.includes("movil") && vOrientacion.includes("horizontal")) {
    vtop = "50%";
    vleft = "75%";
    vmaxWidth = "20%";
  }
  if (vOrientacion.includes("computadora") && vOrientacion.includes("horizontal")) {
    vtop = "50%";
    vleft = "75%";
    vmaxWidth = "20%";
  }
  // Crear el elemento contenedor del rectángulo de información
  var contenedor = document.createElement("div");
    contenedor.style.background = "rgba(" + parseInt(vColores2[1]+vColores2[2],16) +", " + parseInt(vColores2[3]+vColores2[4],16) + ", " + parseInt(vColores2[5]+vColores2[6],16) + ", 0.25)";
    contenedor.style.display = "block";
    contenedor.style.padding = "20px";
    contenedor.style.filter = "drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.5))";
    contenedor.style.maxWidth = vmaxWidth;
    contenedor.style.position = "absolute";
    contenedor.style.left = vleft;
    contenedor.style.top = vtop;
    contenedor.style.transform = "translate(-50%, -50%)";
    contenedor.style.overflowWrap = "break-word";
    contenedor.style.width = "max-content";
    contenedor.style.height = "max-content";

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

    //Agregar imagen a la esquina del cuadrado
    var xImage = document.getElementById('cImagen');
    xImage.style.width = cierre.style.width;
    xImage.style.height = cierre.style.height;
}