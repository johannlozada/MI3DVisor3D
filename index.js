/* Borrar logo de carga */
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.ClassObjetoCargar');
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
/* Funcion para intercambiar de FullScreen a normal */
function fToggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  }
}
/* Saber tipo de pantalla y orientacion */
function fTipoPantalla() {
  let vTipoPantalla = "";
  let vOrientacion = "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    vTipoPantalla = "movil";
    if (screen.width > screen.height) {
      vOrientacion = "horizontal";
    }
    else {
      vOrientacion = "vertical";
    }
  } else {
    vTipoPantalla = "computadora";
    if (screen.width > screen.height) {
      vOrientacion = "horizontal";
    }
    else {
      vOrientacion = "vertical";
    }
  }
  vTipoPantalla = vTipoPantalla + "|" + vOrientacion;
  return vTipoPantalla;
}
/* Obtener la ruta del archivo GLTF en github*/
function fObtenerLink1(pLink){ //Obtener la ruta completa archivo GLTF
  var vContar = 0;
  var vInicio = 0;
  vNuevaCadena = pLink;
  vNuevoLink = 'https://raw.githubusercontent.com/';
  while ((vInicio = pLink.indexOf("/", vInicio) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/')+1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (vContar == 3 || vContar == 4 || vContar > 5){
          vNuevoLink = vNuevoLink + vCadena;
      }
      vContar++;
  }
  vNuevoLink = vNuevoLink + vNuevaCadena;
  return vNuevoLink;
}
/* Obtener solo la ruta de cualquier archivo en github*/
function fObtenerLink2(pLink){ //Obtener la ruta de la "carpeta" donde se encuentra el GLTF
  var vContar = 0;
  var vInicio = 0;
  vNuevaCadena = pLink;
  vNuevoLink = 'https://raw.githubusercontent.com/';
  while ((vInicio = pLink.indexOf("/", vInicio) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/')+1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (vContar == 3 || vContar == 4 || vContar == 6 || vContar == 7){
          vNuevoLink = vNuevoLink + vCadena;
      }
      vContar++;
  }
  return vNuevoLink;
}
/* VentanaInformacion (
    pTitulo = Titulo de la ventana
    pCodigo = Codigo del producto exhibido
    pDescripcion = Descripcion del producto
    pSVG = imagen SVG
    pColores1 = Colores1
    Pcolores2 = Colores2) */
function fVentanaInformacion(pTitulo, pCodigo, pDescripcion, pSvg, pColores1, pColores2) {
  // Posicion y Medidas de acuerdo a pantalla y orientacion
  vOrientacion = fTipoPantalla();
  if (vOrientacion.includes("movil") && vOrientacion.includes("vertical")) {
    vTop = "75%";
    vLeft = "50%";
    vMaxWidth = "60%";
  }
  if (vOrientacion.includes("movil") && vOrientacion.includes("horizontal")) {
    vTop = "50%";
    vLeft = "75%";
    vMaxWidth = "20%";
  }
  if (vOrientacion.includes("computadora") && vOrientacion.includes("horizontal")) {
    vTop = "50%";
    vLeft = "75%";
    vMaxWidth = "20%";
  }
  // Crear el elemento oContenedor del rectángulo de información
  var oContenedor = document.createElement("div");
    oContenedor.style.background = "rgba(" + parseInt(pColores2[1]+pColores2[2],16) +", " + parseInt(pColores2[3]+pColores2[4],16) + ", " + parseInt(pColores2[5]+pColores2[6],16) + ", 0.5)";
    oContenedor.style.filter = "blur(5px)";
    oContenedor.style.display = "block";
    oContenedor.style.padding = "20px";
    oContenedor.style.filter = "drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.5))";
    oContenedor.style.maxWidth = vMaxWidth;
    oContenedor.style.position = "absolute";
    oContenedor.style.left = vLeft;
    oContenedor.style.top = vTop;
    oContenedor.style.transform = "translate(-50%, -50%)";
    oContenedor.style.overflowWrap = "break-word";
    oContenedor.style.width = "max-content";
    oContenedor.style.height = "max-content";

      // Crear la ubicacion para el boton Cerrar X
      var oCierre = document.createElement("span");
        oCierre.setAttribute("id","idSpan");
        oCierre.style.right = "0px";
        oCierre.style.top = "0px";
        oCierre.style.width = "25px";
        oCierre.style.height = "25px";
        oCierre.style.position = "absolute";
        oCierre.style.display = "flex";
        oCierre.style.justifyContent = "center";
        oCierre.style.alignItems = "center";
        oCierre.style.cursor = "pointer";
        oCierre.addEventListener("click", function() {
            oContenedor.parentNode.removeChild(oContenedor);
            return false;
        });
      oContenedor.appendChild(oCierre);

      // Crear el contenido título + codigo + combinacion
      var oTitulo = document.createElement("h3");
      oTitulo.style.position = "flex";
      oTitulo.style.top = vTop + "px";
      oTitulo.style.color = "rgb(" + parseInt(pColores1[1]+pColores1[2],16) +", " + parseInt(pColores1[3]+pColores1[4],16) + ", " + parseInt(pColores1[5]+pColores1[6],16) + ")";
      oTitulo.innerHTML = pTitulo + "<br><br>" + pCodigo + "<br><br>" + pDescripcion;
      oContenedor.appendChild(oTitulo);
      
    // Agregar el oContenedor al cuerpo de la página
    document.body.appendChild(oContenedor);

    // Colocar y Cambiar color SVG
    console.log(window.location);
    //vRuta = fObtenerLink2("https://github.com/johannlozada/MI3DVisor3D/blob/65fcf16ce08f702d610088fa21904c27b85a1057/imagenes/MI3D-Close.svg")
    //vRuta = vRuta + pSvg;
    //fImagenSvg('idSpan', vRuta, pColores1, 'Cerrar', '20px');
}
function fImagenSvg(pIdObjeto, pArchivoSvg, pColor, pInformacion, pTamaño) {
  var oContenedor1 = document.getElementById(pIdObjeto);
  vIdentificador = "idSvg"+pIdObjeto;
  // Cargar el archivo SVG
  fetch(pArchivoSvg)
      .then(response => response.text())
      .then(svgData => {
          // Modificar el contenido del SVG necesario
          var modifiedSVG = svgData.replace('svg xmlns=', 'svg id="' + vIdentificador + '" xmlns=');
          modifiedSVG = modifiedSVG.replace('fill:black', 'fill:' + pColor);
          modifiedSVG = modifiedSVG.replace('width="4.1516mm"', 'width="' + pTamaño + '"');
          modifiedSVG = modifiedSVG.replace('height="4.1516mm"', 'height="' + pTamaño + '"');
          modifiedSVG = modifiedSVG.replace('<style type="text/css">', '<style type="text/css"> #' + vIdentificador + ':hover{ transform: scale(1.1); }');
          modifiedSVG = modifiedSVG.replace('</g>', '</g><title id="idTitulo">' + pInformacion + '</title>');
          //console.log(modifiedSVG);
          // Insertar el SVG modificado dentro del span
          oContenedor1.innerHTML = modifiedSVG;
      })
      .catch(error => {
          console.error('Error al cargar el archivo SVG:', error);
      })
    }