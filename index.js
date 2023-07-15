/* Borrar logo de carga */
/*
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
/**** Colocar CSS inicial en HEAD */
const oStylePagina = document.createElement("style");
oStylePagina.textContent = '\
  @keyframes girar {\
    0% {\
      transform: rotate(0deg);\
    }\
    100% {\
      transform: rotate(360deg);\
    }\
  }\
  @keyframes fadein {\
    from {\
        opacity:1;\
    }\
    to {\
        opacity:0;\
    }\
  };\
  @media only screen and (max-width: 600px) {\
    [1];\
  }';
document.head.appendChild(oStylePagina);
let vSombraUp = 'drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.75))';
let vSombraDn = 'drop-shadow(-3px -3px 2px rgba(68, 68, 68, 0.75))';
let vPadding = '5px';
let vFondoBoton = 'rgba(255, 255, 255, 0.75)';
/**** Desactivar click derecho del mouse */
/*
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
*/
/**** Imagen al cargar la pagina */
function fImagenCarga(pPadre, pIdIdentificador, pDirImagen, pTamano, pObjetoModelViewer) {
  //Crear div
  var oContenedor = document.createElement('div');
    oContenedor.setAttribute('id', pIdIdentificador + 'N01');
    oContenedor.style.display = 'flex';
    oContenedor.style.justifyContent = 'center';
    oContenedor.style.alignItems = 'center';
    oContenedor.style.margin = '0';
    oContenedor.style.position = 'absolute';
    oContenedor.style.top = '50%';
    oContenedor.style.left = '50%';
    oContenedor.style.transform = 'translate(-50%, -50%)';
    //oContenedor.style.filter = vSombraUp;
      //Crear imagen
      var oImg = document.createElement('img');
        oImg.setAttribute('id', pIdIdentificador + 'N02');
        oImg.setAttribute('src', pDirImagen);
        oImg.setAttribute('class', 'ClassObjetoCargar');
        oImg.style.width = pTamano;
        oImg.style.height = pTamano;
        oImg.style.animation = 'girar 5s linear infinite';
      oContenedor.appendChild(oImg);
  document.body.appendChild(oContenedor);
  //Ocultar despues de la carga el GLTF
  pObjetoModelViewer.addEventListener('load', function() {
    if (pObjetoModelViewer.loaded) {
      vtiempo = '0.25';
      oContenedor.style.animation = 'fadein ' + vtiempo + 's';
      setTimeout(() => {
        oImg.style.display = 'none';
      }, Number(vtiempo)*990);
    }
  });
}
/**** Funcion para Colocar una imagen en cualquier lugar de la pantalla*/
function fImagenImgLink(pPadre, pIdIdentificador, pPosX, pPosY, pTamano, pTransformacion, pOpacidad, pDirImagen, pEstado, pUrl, pPagina, pZindex, pCssCodigo) {
  pPadre.addEventListener('load', function() {
    var oContenedor = document.createElement('a');
      if (pEstado) {
        oContenedor.style.display = 'flex';
      }
      else {
        oContenedor.style.display = 'none';
      }
      if (pUrl.length != 0 && pPagina.length != 0) {
        oContenedor.setAttribute('href',pUrl);
        oContenedor.setAttribute('target',pPagina);
      }
      var oImg = document.createElement('img');
        oImg.setAttribute('id', pIdIdentificador);
        oImg.setAttribute('src', pDirImagen);
        if (pUrl.length != 0 && pPagina.length != 0) {
          oImg.style.filter = vSombraUp;
        }
        if (pPosX.includes('L',)) {
          oImg.style.left = pPosX.slice(1,pPosX.length);
        }
        if (pPosX.includes('R',)) {
          oImg.style.right = pPosX.slice(1,pPosX.length);
        }
        if (pPosY.includes('T',)) {
          oImg.style.top = pPosY.slice(1,pPosY.length);
        }
        if (pPosY.includes('B',)) {
          oImg.style.bottom = pPosY.slice(1,pPosY.length);
        }
        if (pPosX.includes('C',)) {
          //vTranslacionX = pPosX.slice(1,pPosX.length);
          //oImg.style.left = '50%';
        }
        if (pPosY.includes('C',)) {
          //vTranslacionY = pPosY.slice(1,pPosY.length);
          //oImg.style.top = '50%';
        }
        oImg.style.justifyContent = 'center';
        oImg.style.alignItems = 'center';
        oImg.style,margin = '0';
        oImg.style.position = 'absolute';
        oImg.style.display = 'flex';
        oImg.style.opacity =  pOpacidad;
        oImg.style.backgroundPosition = 'center';
        oImg.style.backgroundRepeat = 'no-repeat';
        oImg.style.backgroundSize = 'cover';
        oImg.style.transform = pTransformacion;
        oImg.style.width = 'auto';
        oImg.style.height = pTamano;
        //console.log("#" + pIdIdentificador + pCssCodigo); FALTA COMPLETAR ESTA INFORMACION EN EL HEAD PARA QUE AFECTE LA PAGINA
        if (pCssCodigo.length>0) {
          oStylePagina.textContent = oStylePagina.textContent.replace('[1];', '#' + pIdIdentificador + pCssCodigo);
        }
      oContenedor.appendChild(oImg);
    pPadre.appendChild(oContenedor);
    oImg.style.zIndex = pZindex;
  });
}
/* Funcion para entrar y salir modo FULLSCREEN */
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
    PColores2 = Colores2) */
    //COLOCAR UBICACION Y CORREGIR PROBLEMA DE CAMBIO DE TAMAÑO DE PANTALLA COMO SE HIZO CON LOS LOGOS
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
  vMargenes = "20px";
  // Crear el elemento oContenedor del rectángulo de información
  var oContenedor = document.createElement("div");
    oContenedor.style.background = "rgba(" + parseInt(pColores2[1]+pColores2[2],16) +", " + parseInt(pColores2[3]+pColores2[4],16) + ", " + parseInt(pColores2[5]+pColores2[6],16) + ", 0.5)";
    oContenedor.style.filter = "blur(5px)";
    oContenedor.style.display = "block";
    oContenedor.style.padding = vMargenes;
    oContenedor.style.filter = vSombraUp;
    oContenedor.style.maxWidth = vMaxWidth;
    oContenedor.style.position = "absolute";
    oContenedor.style.left = vLeft;
    oContenedor.style.top = vTop;
    oContenedor.style.transform = "translate(-50%, -50%)";
    oContenedor.style.overflowWrap = "break-word";
    oContenedor.style.width = "max-content";
    oContenedor.style.height = "max-content";
    oContenedor.style.color = "rgb(" + parseInt(pColores1[1]+pColores1[2],16) +", " + parseInt(pColores1[3]+pColores1[4],16) + ", " + parseInt(pColores1[5]+pColores1[6],16) + ")";

      // Crear la ubicacion para el boton Cerrar X
      var oCierre = document.createElement("span");
        oCierre.setAttribute("id","idSpan");
        oCierre.style.right = "0px";
        oCierre.style.top = "0px";
        oCierre.style.width = vMargenes;
        oCierre.style.height = vMargenes;
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
      var oTitulo = document.createElement("div");
        oTitulo.innerHTML = "<b><u>" + pTitulo + "</u></b><br><br>";
      oContenedor.appendChild(oTitulo);

      var oCodigo = document.createElement("div");
        oCodigo.innerHTML = "<b>" + pCodigo + "</b><br><br>";
      oContenedor.appendChild(oCodigo);

      var oDescripcion = document.createElement("div");
        oDescripcion.innerHTML = pDescripcion;
      oContenedor.appendChild(oDescripcion);
    // Agregar el oContenedor al cuerpo de la página
  document.body.appendChild(oContenedor);

  // Colocar y Cambiar color SVG
  //console.log("JS: ", pSvg);
  fImagenSvg2('idSpan', pSvg, pColores1, 'Cerrar', vMargenes);
}
//pDisposicion: L(R-L) P(T-B) = Landscape Right Left - Portrait Top Bottom / Ejemplos LR (Landscape hacia la Derecha)
function fBarraHerramienta (pPadre, pId, pPosX, pPosY, pTamano, pEstado, pColores1, pColores2, pOpciones, pDisposicion) {
  vPos01 = pDisposicion.slice(0,1);
  vPos02 = pDisposicion.slice(2,3);
  pPadre.addEventListener('load', function() {
    var oContenedor = document.createElement("div");
      if (pEstado) {
        oContenedor.style.display = 'flex';
      }
      else {
        oContenedor.style.display = 'none';
      }
      oContenedor.setAttribute('id', pId);
      if (pPosX.includes('L',)) {
        oContenedor.style.left = pPosX.slice(1,pPosX.length);
      }
      if (pPosX.includes('R',)) {
        oContenedor.style.right = pPosX.slice(1,pPosX.length);
      }
      if (pPosY.includes('T',)) {
        oContenedor.style.top = pPosY.slice(1,pPosY.length);
      }
      if (pPosY.includes('B',)) {
        oContenedor.style.bottom = pPosY.slice(1,pPosY.length);
      }
      oContenedor.style.position = 'absolute';
      oContenedor.style.borderRadius = '5px 5px 5px 5px';
      oContenedor.style.padding = vPadding;
      if (vPos01 === 'L') {
        oContenedor.style.flexFlow = 'row wrap';
        if (vPos02 === 'R') {
          oContenedor.style.flexDirection = 'row';
        }
        if (vPos02 === 'L') {
          oContenedor.style.flexDirection = 'row-reverse';
        }
      }
      if (vPos01 === 'P') {
        oContenedor.style.flexFlow = 'column wrap';
        if (vPos02 === 'T') {
          oContenedor.style.flexDirection = 'column-reverse';
        }
        if (vPos02 === 'B') {
          oContenedor.style.flexDirection = 'column';
        }
      }
      oContenedor.style.width = pTamano;
      oContenedor.style.filter = vSombraUp;
      oContenedor.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.5)';
      for (let i = 0; i < pOpciones.length; i++) {
        fImagenImg(oContenedor, pTamano, pColores2, pOpciones[i].titulo, pOpciones[i].imagen, i, pOpciones);
      };
    pPadre.appendChild(oContenedor);
  });
}
function fImagenImg(pPadre, pTamano, pColores, pTitulo, pArchivoIMG, pContador, pOpciones) {
  vTamanoBKP = pTamano;
  pTamano = parseInt(pTamano) - parseInt(vPadding);
  pTamano = pTamano.toString();
  pTamano = pTamano + vTamanoBKP.slice(pTamano.length,vTamanoBKP.length);
  pTitulo = pTitulo.replace(/ /g,'');
  var oDiv = document.createElement('div');
    oDiv.style.borderRadius = '3px 3px 3px 3px';
    var oImg = document.createElement('img');
      oImg.setAttribute('id', 'id' + pTitulo);
      oImg.setAttribute('src', pArchivoIMG);
      oImg.setAttribute('activo', true);
      oImg.setAttribute('class', 'classNivel00');
      oImg.style.width = pTamano;
      oImg.style.margin = '2.5px';
      //oImg.style.filter = vSombraUp;
      oImg.style.display = 'flex';
      oImg.style.borderRadius = '2px 2px 2px 2px';
      oImg.style.opacity = '1';
      oImg.style.justifyContent = 'center';
      oImg.style.alignItems = 'center';
      if (pTitulo != '-') {
        //oDiv.style.height = pTamano;
        oImg.style.cursor = 'pointer';
        oImg.addEventListener('click', function() {
          var vfuncion = eval('f'+pTitulo);
          vfuncion(document.querySelector('#' + 'id' + pTitulo), oDiv);
        });
        var oStyle = document.createElement('style');
          oStyle.setAttribute('type','text/css');
          oStyle.innerHTML = '#' + 'id' + pTitulo + ':hover { transform: scale(1.1); }';
        oImg.appendChild(oStyle);
      }
    oDiv.appendChild(oImg);
  pPadre.appendChild(oDiv);
  if (pContador>0) {
    oDiv.style.display = 'none';
    oDiv.setAttribute('class', 'classNivel01');
  }
}
function fBotonCambio(pPadre, pDiv) {
  var vActivo = pPadre.getAttribute('activo');
  vActivo = vActivo === 'true';
  vActivo = !vActivo;
  pPadre.setAttribute('activo', vActivo);
  if (vActivo) {
    pDiv.style.background = '';
  }
  else{
    pDiv.style.background = vFondoBoton;
  }
  return vActivo;
}
function fOpciones(pPadre, pDiv) { // funcion MENU
  vActivo = fBotonCambio(pPadre, pDiv);
  vClassNivel = document.getElementsByClassName('classNivel01');
  if (vActivo) {
    for (let i = 0; i < vClassNivel.length; i++) {
      vClassNivel[i].style.display = 'none';
    }
  }
  else{
    for (let i = 0; i < vClassNivel.length; i++) {
      vClassNivel[i].style.display = 'block';
    }
  }
}
function fDimensiones(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fVariantes(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fFullScreen(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
  fToggleFullScreen();
}
function fRealidadAumentada(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fCaptura(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fCompartir(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fGaleria (pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
function fAyuda(pPadre, pDiv) {
  vActivo = fBotonCambio(pPadre, pDiv);
}
// funcion PARA HACER PRUEBAS
function fTest() {
  var testValues = "fg8uj.example";
  var testValuesx = 'width="4.1516mm"';
  console.log(testValues, "=  ", testValues.replace(/\b[\w?*]+\.example/, "example"));
  console.log(testValuesx, "=  ", testValuesx.replace(/width="\b[\w?*.]+/, 'width="123'));
}