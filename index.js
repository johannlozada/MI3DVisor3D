/* Borrar logo de carga */
/*
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.ClassObjetoCargar');
  for (let i = 1; i <= 8; i++) {
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
  .dot{\
    display: none;\
  }\
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
/**** Colocar Variables Iniciales */
let vSombraUp = 'drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.75))';
let vSombraDn = 'drop-shadow(-3px -3px 2px rgba(68, 68, 68, 0.75))';
let vPadding = '2px';
let vBordeRadio = '5px';
let vBotonFondoPulsado = 'rgba(255, 255, 255, 0.45)';
let vBlurFondo = 'blur(4px)';
let vBlurBorde = '1px solid rgba(255, 255, 255, 0.18)';
/**** Desactivar click derecho del mouse */
/*
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
*/
/**** Imagen al cargar la pagina */
function getURLParameters() {
  let vUrlParams = {};
  let vMatch,
  vPl = /\+/g,  // Regex para reemplazar los caracteres especiales codificados en la URL
  vBuscar = /([^&=]+)=?([^&]*)/g,
  fDecode = function (s) {
      return decodeURIComponent(s.replace(vPl, ' '));
  },
  vQuery = window.location.search.substring(1);
  while ((vMatch = vBuscar.exec(vQuery))) {
    let vParam = fDecode(vMatch[1]);
    let vValor = fDecode(vMatch[2]);
    vUrlParams[vParam] = vValor;
  }
  return vUrlParams;
}
// Obtener los parámetros de la URL y mostrarlos en consola
function fMostrarParametros() {
  let vParametros = getURLParameters();
  // Mostrar los parámetros en la página
  for (let vParametro in vParametros) {
      console.log(vParametro, vParametros[vParametro]);
  }
}
function fImagenCarga(pPadre, pIdIdentificador, pDirImagen, pTamano, pContenedor) {
  //Crear div
  console.log(pDirImagen);
  let oContenedor = document.createElement('div');
    oContenedor.setAttribute('id', pIdIdentificador + 'Div');
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
      let oImg = document.createElement('img');
        oImg.setAttribute('id', pIdIdentificador + 'Img');
        oImg.setAttribute('src', pDirImagen);
        oImg.setAttribute('class', 'ClassObjetoCargar');
        oImg.style.width = pTamano;
        oImg.style.height = pTamano;
        oImg.style.animation = 'girar 5s linear infinite';
      oContenedor.appendChild(oImg);
  document.body.appendChild(oContenedor);
  //Ocultar despues de la carga el GLTF
  pContenedor.addEventListener('load', function() {
    if (pContenedor.loaded) {
      vtiempo = '0.25';
      oContenedor.style.animation = 'fadein ' + vtiempo + 's';
      setTimeout(() => {
        oImg.style.display = 'none';
      }, Number(vtiempo)*990);
    }
  });
}
/**** Funcion para Colocar una imagen en cualquier lugar de la pantalla, con opcion de ir a Pagina Link*/
function fImagenImgLink(pPadre, pIdIdentificador, pPosX, pPosY, pTamano, pTransformacion, pOpacidad, pDirImagen, pEstado, pUrl, pPagina, pZindex, pCssCodigo) {
  pPadre.addEventListener('load', function() {
    let oContenedor = document.createElement('a');
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
      let oImg = document.createElement('img');
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
/* Obtener la ruta del archivo GLTF en github
function fObtenerLink1(pUrl){ //Obtener la ruta completa archivo GLTF
  let vContar = 0;
  let vInicio = 0;
  vNuevaCadena = pUrl;
  vNuevoUrl = 'https://raw.githubusercontent.com/';
  while ((vInicio = pUrl.indexOf("/", vInicio) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/') + 1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (vContar == 3 || vContar == 4 || vContar > 5){
          vNuevoUrl = vNuevoUrl + vCadena;
      }
      vContar++;
  }
  vNuevoUrl = vNuevoUrl + vNuevaCadena;
  return vNuevoUrl;
}
function fObtenerLink2(pUrl){ //Obtener la ruta de la "carpeta" donde se encuentra el GLTF
  let vContar = 0;
  let vInicio = 0;
  vNuevaCadena = pUrl;
  vNuevoUrl = 'https://raw.githubusercontent.com/';
  while ((vInicio = pUrl.indexOf("/", vInicio) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/') + 1);
      //console.log(vCadena);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      //console.log(vNuevaCadena);
      if (vContar == 3 || vContar == 4 || vContar == 6 || vContar == 7){
          vNuevoUrl = vNuevoUrl + vCadena;
      }
      vContar++;
  }
  return vNuevoUrl;
}*/
function fObtenerLink(pUrl, pTipo){ //Obtener la ruta de la "D = carpeta F = Archivo" donde se encuentra el GLTF
  let vContar = 0;
  let vInicio = 0;
  vNuevaCadena = pUrl;
  vNuevoUrl = 'https://raw.githubusercontent.com/';
  while ((vInicio = pUrl.indexOf("/", vInicio) + 1) > 0) {
      vCadena = vNuevaCadena.slice(0, vNuevaCadena.indexOf('/') + 1);
      vNuevaCadena = vNuevaCadena.slice(vCadena.length, vNuevaCadena.length);
      if (vContar == 3 || vContar == 4 || vContar > 5){
          vNuevoUrl = vNuevoUrl + vCadena;
      }
      vContar++;
  }
  if (pTipo === 'F' && (vContar == 3 || vContar == 4 || vContar > 5)){
    vNuevoUrl = vNuevoUrl + vNuevaCadena;
  }
  return vNuevoUrl;
}
function fARBoton(pContenedor, pRutaImagen) {
  let oBotonAr = document.createElement('button');
      oBotonAr.setAttribute('slot', 'ar-button');
      oBotonAr.setAttribute('id', 'idAr-button');
  pContenedor.appendChild(oBotonAr);
  let oDiv = document.createElement('div');
      oDiv.setAttribute('id', 'ar-prompt');
      let oImg = document.createElement('img');
          oImg.setAttribute('src', pRutaImagen);
      oDiv.appendChild(oImg);
  pContenedor.appendChild(oDiv);
  let oBotonFail = document.createElement('button');
      oBotonFail.setAttribute('id', 'ar-failure');
      oBotonFail.innerHTML = 'No se detecta AR';
  pContenedor.appendChild(oBotonFail);
}
function fMarcoOpciones(pContenedor, pOpciones, pColor1, pColor2, pPosX, pPosY) {
  pContenedor.addEventListener('load', function() {
      let oMarco = document.createElement('div');
          if (pPosX.includes('L',)) {
              oMarco.style.left = pPosX.slice(1,pPosX.length);
          }
          if (pPosX.includes('R',)) {
              oMarco.style.right = pPosX.slice(1,pPosX.length);
          }
          if (pPosY.includes('T',)) {
              oMarco.style.top = pPosY.slice(1,pPosY.length);
          }
          if (pPosY.includes('B',)) {
              oMarco.style.bottom = pPosY.slice(1,pPosY.length);
          }
          oMarco.setAttribute('id', 'idMarcoleyenda');
          oMarco.setAttribute('class', 'classMarcoLeyenda');
          oMarco.innerHTML = 'Opciones: <br>';
          oMarco.style.background = pColor1;
          oMarco.style.borderRadius = '4px';
          oMarco.style.border = 'none';
          oMarco.style.boxSizing = 'border-box';
          oMarco.style.color = pColor2;
          oMarco.style.display = 'block';
          oMarco.style.padding = '10px';
          oMarco.style.filter = 'drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.5))';
          oMarco.style.maxWidth = '200px';
          oMarco.style.position = 'absolute';
          oMarco.style.overflowWrap = 'break-word';
          oMarco.style.width = 'max-content';
          oMarco.style.height = 'max-content';
          for (i=0; i < pOpciones.length; i++) {
              let oInput = document.createElement('input');
                  oInput.setAttribute('id', pOpciones[i].identificador);
                  oInput.setAttribute('type', 'checkbox');
              oMarco.appendChild(oInput);
              let oLabel = document.createElement('label');
                  oLabel.setAttribute('for', pOpciones[i].identificador);
                  oLabel.innerHTML = pOpciones[i].texto + '<br>';
              oMarco.appendChild(oLabel);
          }
      pContenedor.appendChild(oMarco);
  });
}
function fVentanaInformacion(pTexto) {

}
function fAnalsisOrientacion(pClave, pMedidaBarra, pContenedor, pBarra) {
  //PLT colum
  //PRT colum
  //PLB colum reverse
  //PRB colum reverse
  if (pClave === 'PLT') {
      if (pMedidaBarra < pContenedor.clientHeight) {
          pBarra.style.flexDirection = 'column';
      } else {
          pBarra.style.flexDirection = 'row';
      }
  }
  if (pClave === 'PRT') {
      if (pMedidaBarra < pContenedor.clientHeight) {
          pBarra.style.flexDirection = 'column';
      } else {
          pBarra.style.flexDirection = 'row-reverse';
      }
  }
  if (pClave === 'PLB') {
      if (pMedidaBarra < pContenedor.clientHeight) {
          pBarra.style.flexDirection = 'column-reverse';
      } else {
          pBarra.style.flexDirection = 'row';
      }
  }
  if (pClave === 'PRB') {
      if (pMedidaBarra < pContenedor.clientHeight) {
          pBarra.style.flexDirection = 'column-reverse';
      } else {
          pBarra.style.flexDirection = 'row-reverse';
      }
  }
  //LLT row wrap
  //LRT row reverse wrap
  //LLB row reverse wrap
  //LRB row wrap
  if (pClave === 'LLT') {
      if (pMedidaBarra < pContenedor.clientWidth) {
          pBarra.style.flexDirection = 'row';
      } else {
          pBarra.style.flexDirection = 'column';
      }
  }
  if (pClave === 'LRT') {
      if (pMedidaBarra < pContenedor.clientWidth) {
          pBarra.style.flexDirection = 'row-reverse';
      } else {
          pBarra.style.flexDirection = 'column';
      }
  }
  if (pClave === 'LLB') {
      if (pMedidaBarra < pContenedor.clientWidth) {
          pBarra.style.flexDirection = 'row';
      } else {
          pBarra.style.flexDirection = 'column-reverse';
      }
  }
  if (pClave === 'LRB') {
      if (pMedidaBarra < pContenedor.clientWidth) {
          pBarra.style.flexDirection = 'row-reverse';
      } else {
          pBarra.style.flexDirection = 'column-reverse';
      }
  }
}

function fBarraHerramientas(pContenedor, pId, pPosX, pPosY, pTamano, pColores1, pColores2, pEstado, pDisposicion, pBotones) {
  pContenedor.addEventListener('load', function() {
    let oBarra = document.createElement('div');
        if (pPosX.includes('L')) {
            oBarra.style.left = pPosX.slice(1,pPosX.length);
        }
        if (pPosX.includes('R')) {
            oBarra.style.right = pPosX.slice(1,pPosX.length);
        }
        if (pPosY.includes('T')) {
            oBarra.style.top = pPosY.slice(1,pPosY.length);
        }
        if (pPosY.includes('B')) {
            oBarra.style.bottom = pPosY.slice(1,pPosY.length);
        }
        oBarra.setAttribute('id', pId);
        oBarra.style.position = 'absolute';
        oBarra.style.margin = '0px';
        oBarra.style.borderRadius = vBordeRadio;
        oBarra.style.padding = vPadding;
        oBarra.style.filter = vSombraUp;
        oBarra.style.backdropFilter = vBlurFondo;
        oBarra.style.border = vBlurBorde;
        oBarra.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.25)';
        for (i=0; i < pBotones.length; i++) {
            pBotones[i].tamano = pTamano;
            fImagenImg(oBarra, pColores2, pBotones[i].titulo, pBotones[i].imagen, i, pBotones, pContenedor);
        }
    pContenedor.appendChild(oBarra);
    oBarra.style.display = 'flex';
    let vClave = pDisposicion+pPosX.slice(0,1)+pPosY.slice(0,1);
    let vMedidaBarra = oBarra.clientWidth > oBarra.clientHeight ? oBarra.clientWidth : oBarra.clientHeight;
/*    console.log('Clave : ', vClave, 
      'Barra: ', vMedidaBarra,
      'Alto P:', pContenedor.clientHeight, 
      'Ancho P:', pContenedor.clientWidth,
      'Forma :', pDisposicion, 
      'pos X: ', pPosX.slice(0,1),
      'pos Y: ', pPosY.slice(0,1));*/
    fAnalsisOrientacion(vClave, vMedidaBarra, pContenedor, oBarra);
    let vOrientacion = window.matchMedia("(orientation: portrait)");
    vOrientacion.addEventListener("change", function(e) {
        if(e.matches) {// Portrait mode
            fAnalsisOrientacion(vClave, vMedidaBarra, pContenedor, oBarra);
        } else { // Landscape mode
            fAnalsisOrientacion(vClave, vMedidaBarra, pContenedor, oBarra);
        }
    })
  })
}

function fImagenImg(pBarra, pColores, pTitulo, pArchivoIMG, pIndice, pBotones, pContenedor) {
  pTitulo = pTitulo.replace(/ /g,'');
  let oBoton = document.createElement('div');
    oBoton.setAttribute('id', 'idDiv' + pTitulo);
    oBoton.style.borderRadius = `${parseInt(vBordeRadio)- parseInt(vPadding)}px`;
    oBoton.style.margin = '1px';
    oBoton.style.height = `${parseInt(pBotones[pIndice].tamano) - parseInt(vPadding) * 2}px`;
    oBoton.style.width = `${parseInt(pBotones[pIndice].tamano) - parseInt(vPadding) * 2}px`;
    oBoton.setAttribute('class', 'classPadre');
    oBoton.setAttribute('visible', pBotones[pIndice].visible);
    oBoton.setAttribute('disponible', pBotones[pIndice].disponible);
    oBoton.setAttribute('pulsado', pBotones[pIndice].pulsado === '0' ? false : true);
    let oImg = document.createElement('img');
      oImg.setAttribute('id', 'idImg' + pTitulo);
      oImg.style.borderRadius = `${parseInt(vBordeRadio)- parseInt(vPadding)}px`;
      if (pTitulo != '-') {
        oImg.setAttribute('title', pTitulo);
        oImg.setAttribute('src', pArchivoIMG);
        oImg.style.margin = '2px';
        oImg.style.height = `${parseInt(pBotones[pIndice].tamano) - (parseInt(vPadding) * 4)}px`;
        oImg.style.width = `${parseInt(pBotones[pIndice].tamano) - (parseInt(vPadding) * 4)}px`;
        oImg.addEventListener('click', function() {
          let vLlamarFuncion = eval('f'+pTitulo);
          vLlamarFuncion(oBoton, pBotones, pContenedor);
        });
        let oStyle = document.createElement('style');
          oStyle.setAttribute('type','text/css');
          oStyle.innerHTML = '#' + 'idImg' + pTitulo + ':hover { transform: scale(1.2); } ';
          oImg.style.cursor = 'pointer';
          if (pBotones[pIndice].disponible === '0') {
            oStyle.innerHTML = '#' + 'idImg' + pTitulo;
            oImg.style.cursor = '';
            oImg.style.filter = 'invert(50%)';
          }
        oImg.appendChild(oStyle);
      }
      else {
        oBoton.style.height = '6px';
        oBoton.style.width = '6px';
      }
    oBoton.appendChild(oImg);
  pBarra.appendChild(oBoton);
  if (pBotones[pIndice].visible === '0') {
    oBoton.style.display = 'none';
    oBoton.setAttribute('class', 'classHijo');
  }
}
function fAnalisisBoton(oBoton) {
  let vPulsado = oBoton.getAttribute('pulsado');
  let vActivo = oBoton.getAttribute('disponible');
  vPulsado = vPulsado === 'false';
  oBoton.setAttribute('pulsado', vPulsado);
  if (vPulsado) {
    if (vActivo === '1') {
      oBoton.style.background = vBotonFondoPulsado;
    }
  } 
  else {
    oBoton.style.background = '';
  }
  return vPulsado;
}
function fMenuPrincipal(oBoton, pBotones, pContenedor) { // funcion MENU
  vPulsado = fAnalisisBoton(oBoton);
  oClassNivel = document.getElementsByClassName('classHijo');
  for (let i = 0; i < oClassNivel.length; i++) {
    if (vPulsado) {
      oClassNivel[i].style.display = 'block';
      oClassNivel[i].setAttribute('visible', '1');
    }
    else{
      oClassNivel[i].style.display = 'none';
      oClassNivel[i].setAttribute('visible', '0');
    }
  }
}
function fDimensiones(pPadre, oBoton, pContenedor) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
  oLine = pContenedor.querySelector('#idDimLines');
  if (vActivo) {
    oLine.classList.remove('hide');
  } else {
    oLine.classList.add('hide');
  }
  pContenedor.querySelectorAll('#HotSpotDimension').forEach((hotspot) => {
    if (vActivo) {
      hotspot.classList.remove('hide');
    } else {
      hotspot.classList.add('hide');
    }
  });
}

function fVariantes(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
function fFullScreen(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
  fToggleFullScreen();
}
function fRealidadAumentada(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
  //Preguntar si esta en PC o Movil
  // Si esta en PC desactivarlo
  //Sino Llamar a AR
  //Ver si se mantiene activa la barra de herramientas
}
function fCaptura(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
function fCompartir(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
function fGaleria(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
function fDetalles(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
function fInformacion(pPadre, oBoton) {
  vActivo = fAnalisisBoton(pPadre, oBoton);
}
// funcion PARA HACER PRUEBAS
function fTest() {
  let testValues = "fg8uj.example";
  let testValuesx = 'width="4.1516mm"';
  console.log(testValues, "=  ", testValues.replace(/\b[\w?*]+\.example/, "example"));
  console.log(testValuesx, "=  ", testValuesx.replace(/width="\b[\w?*.]+/, 'width="123'));
}
function fClassListVisibilidad(pElemento, pEstado) { //pasa dimension de Oculto/Visible
  if (pEstado) {
      pElemento.classList.remove('hide');
  } else {
      pElemento.classList.add('hide');
  }
}