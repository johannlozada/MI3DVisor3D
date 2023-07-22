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
let vPadding = '2px';
let vBordeRadio = '5px';
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
        //oBarra.style.justifyContent = 'center';
        //oBarra.style.alignItems = 'center';
        oBarra.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.25)';
        for (i=0; i < pBotones.length; i++) {
            pBotones[i].tamano = pTamano;
            fImagenImg(oBarra, pColores2, pBotones[i].titulo, pBotones[i].imagen, i, pBotones);
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

function fImagenImg(pContenedor, pColores, pTitulo, pArchivoIMG, pIndice, pBotones) {
  pTitulo = pTitulo.replace(/ /g,'');
  let oBoton = document.createElement('div');
      oBoton.setAttribute('id', 'idDiv' + pTitulo);
      oBoton.style.borderRadius = `${parseInt(vBordeRadio)- parseInt(vPadding)}px`;
      oBoton.style.margin = '1px';
      oBoton.style.height = `${parseInt(pBotones[pIndice].tamano) - parseInt(vPadding) * 2}px`;
      oBoton.style.width = `${parseInt(pBotones[pIndice].tamano) - parseInt(vPadding) * 2}px`;
      oBoton.setAttribute('class', 'classPadre');
      oBoton.setAttribute('pulsado', false);
      oBoton.setAttribute('activo', pBotones[pIndice].activo);
      let oImg = document.createElement('img');
          oImg.setAttribute('id', 'idImg' + pTitulo);
          oImg.style.borderRadius = `${parseInt(vBordeRadio)- parseInt(vPadding)}px`;
          //oImg.style.background = 'blue';
          if (pTitulo != '-') {
              //oBoton.style.background = 'white';
              oImg.setAttribute('title', pTitulo);
              oImg.setAttribute('src', pArchivoIMG);
              oImg.style.margin = '2px';
              oImg.style.height = `${parseInt(pBotones[pIndice].tamano) - (parseInt(vPadding) * 4)}px`;
              oImg.style.width = `${parseInt(pBotones[pIndice].tamano) - (parseInt(vPadding) * 4)}px`;
              oImg.addEventListener('click', function() {
                  let vfuncion = eval('f'+pTitulo);
                  vfuncion(document.querySelector('#' + 'idDiv' + pTitulo), oBoton);
              });
              let oStyle = document.createElement('style');
                  oStyle.setAttribute('type','text/css');
                  oStyle.innerHTML = '#' + 'idImg' + pTitulo + ':hover { transform: scale(1.2); } ';
                  oImg.style.cursor = 'pointer';
                  if (pBotones[pIndice].activo === '0') {
                    oStyle.innerHTML = '#' + 'idImg' + pTitulo;
                    oImg.style.cursor = '';
                  }
              oImg.appendChild(oStyle);
          }
          else {
              oBoton.style.height = '6px';
              oBoton.style.width = '6px';
          }
      oBoton.appendChild(oImg);
  pContenedor.appendChild(oBoton);
  if (pIndice > 0) {
      oBoton.style.display = 'none';
      oBoton.setAttribute('class', 'classHijo');
  }
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
function fAnalisisBoton(pPadre, pDiv) {
  var vPulsado = pPadre.getAttribute('pulsado');
  var vActivo = pPadre.getAttribute('activo');
  vPulsado = vPulsado === 'false';
  pPadre.setAttribute('pulsado', vPulsado);
  if (vPulsado) {
    if (vActivo==='1') {
      pDiv.style.background = vFondoBoton;
    }
  } 
  else {
    pDiv.style.background = '';
  }
  vPulsado = !vPulsado;
  return vPulsado;
}
function fMenuPrincipal(pPadre, pDiv) { // funcion MENU
  vPulsado = fAnalisisBoton(pPadre, pDiv);
  vClassNivel = document.getElementsByClassName('classHijo');
  for (let i = 0; i < vClassNivel.length; i++) {
    if (vPulsado) {
      vClassNivel[i].style.display = 'none';
    }
    else{
      vClassNivel[i].style.display = 'block';
    }
  }
}
function fDimensiones(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fVariantes(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fFullScreen(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
  fToggleFullScreen();
}
function fRealidadAumentada(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
  //fInsertarARBoton();
  //Preguntar si esta en PC o Movil
  // Si esta en PC desactivarlo
  //Sino Llamar a AR
  //Ver si se mantiene activa la barra de herramientas
}
function fCaptura(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fCompartir(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fGaleria(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fDetalles(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
function fInformacion(pPadre, pDiv) {
  vActivo = fAnalisisBoton(pPadre, pDiv);
}
// funcion PARA HACER PRUEBAS
function fTest() {
  var testValues = "fg8uj.example";
  var testValuesx = 'width="4.1516mm"';
  console.log(testValues, "=  ", testValues.replace(/\b[\w?*]+\.example/, "example"));
  console.log(testValuesx, "=  ", testValuesx.replace(/width="\b[\w?*.]+/, 'width="123'));
}
function fInsertarARBoton() {
  var idRealidadAumentada = document.getElementById('idRealidadAumentada');
  idRealidadAumentada.setAttribute('slot','ar-button');
  console.log(idRealidadAumentada);
}