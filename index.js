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
const oStylePagina = document.createElement('style');
oStylePagina.textContent = "\
  /* Import Google font - Poppins */\
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');\
  *{\
    margin: 0;\
    padding: 0;\
    font-family: 'Poppins', sans-serif;\
  }\
  body {\
    width: 100vw;\
    height: 100vh;\
    font-size: 12px;\
  }\
  .hide{\
    display: none;\
  }\
  .dot{\
    display: none;\
  }\
  /*[1]*/\
  @media only screen and (max-width: 600px) {\
    /*[2]*/\
  }\
  /* This keeps child nodes hidden while the element loads */\
  :not(:defined) > * {\
  display: none;\
  }";
document.head.appendChild(oStylePagina);
/**** Colocar Variables Iniciales */
let vSombraUp = 'drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.75))';
let vSombraDn = 'drop-shadow(-3px -3px 2px rgba(68, 68, 68, 0.75))';
let vBordeDestelloExterno = 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 1) )';
let vBordeDestelloInterno = 'drop-shadow(inset 1px 1px 3px rgba(255, 255, 255, 1) )';
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
// Insertar codigo CSS en el principal /*[1]*/ y screen <600 /*[2]*/
function fInsertarCssCode(pComodin, pCssCode){
  //previamente declarar oStylePagina en la principal
  oStylePagina.textContent = oStylePagina.textContent.replace(pComodin, pCssCode + pComodin);
}
function fImagenCarga(pPadre, pIdIdentificador, pDirImagen, pTamano, pContenedor) {
  //Crear div
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
  vCssCodigo =    "\
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
    }";
  fInsertarCssCode('/*[1]*/', vCssCodigo);
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
        vCssCodigo = "\
        #" + pIdIdentificador + "{\
            height: " + pTamano + ";\
        }";
        fInsertarCssCode('/*[1]*/', vCssCodigo);
        //Insertar codigo screen < 600px
        if (pCssCodigo.length>0) {
          fInsertarCssCode('/*[2]*/', '#' + pIdIdentificador + pCssCodigo);
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
function fTipoDispositivo() {
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
/*  let oBotonAr = document.createElement('button');
      oBotonAr.setAttribute('slot', 'ar-button');
      oBotonAr.setAttribute('id', 'idAr-button');
  pContenedor.appendChild(oBotonAr);*/
  if (fARSoportado()) {
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
//Barra de herramientas q trabaja con Array JSon
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
      oBarra.style.display = 'flex';
      oBarra.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.25)';
      for (i=0; i < pBotones.length; i++) {
          pBotones[i].tamano = pTamano;
          fImagenImg(oBarra, pColores2, pBotones[i].titulo, pBotones[i].imagen, i, pBotones, pContenedor);
      }
    pContenedor.appendChild(oBarra);
    let vClave = pDisposicion+pPosX.slice(0,1)+pPosY.slice(0,1);
    let vMedidaBarra = oBarra.clientWidth > oBarra.clientHeight ? oBarra.clientWidth : oBarra.clientHeight;
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
  /*
  if (pBotones[pIndice].visible === '0') {
    oBoton.style.display = 'none';
    oBoton.setAttribute('class', 'classHijo');
  }
  */
}
function fAnalisisBoton(pBoton) {
  let vPulsado = pBoton.getAttribute('pulsado');
  vPulsado = vPulsado === 'false';
  pBoton.setAttribute('pulsado', vPulsado);
  if (vPulsado) {
    if (pBoton.getAttribute('disponible') === '1') {
      pBoton.style.background = vBotonFondoPulsado;
    }
  } 
  else {
    pBoton.style.background = '';
  }
  return vPulsado;
}
function fMenuPrincipal(pBoton, pBotones, pContenedor) { // funcion MENU
  vPulsado = fAnalisisBoton(pBoton);
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
function fDimensiones(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
    oLine = pContenedor.querySelector('#idDimLines');
    if (vPulsado) {
      oLine.classList.remove('hide');
    } else {
      oLine.classList.add('hide');
    }
    pContenedor.querySelectorAll('#HotSpotDimension').forEach((hotspot) => {
      if (vPulsado) {
        hotspot.classList.remove('hide');
      } else {
        hotspot.classList.add('hide');
      }
    });
  }
}

function fVariantes(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
  vPulsado = fAnalisisBoton(pBoton, pBotones);
    pContenedor.querySelectorAll('#HotSpotVariante').forEach((hotspot) => {
      if (vPulsado) {
        hotspot.classList.remove('hide');
      } else {
        hotspot.classList.add('hide');
      }
    });
  }
}
function fFullScreen(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && pBoton.getAttribute('pulsado') === 'true') {
        pBoton.setAttribute('pulsado', 'false');
        pBoton.style.background = '';
      }
    });
    fToggleFullScreen();
  }
}
function fRealidadAumentada(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
    console.log('Realidad Aumentada ', pContenedor.canActivateAR);
    if (vPulsado) {
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && pBoton.getAttribute('pulsado')==='true') {
          pBoton.setAttribute('pulsado', 'false');
          pBoton.style.background = '';
        }
      });
      pContenedor.activateAR();
    } else {
      pContenedor.exitAR();
    }
  }

/*
  window.addEventListener('popstate', () => {
    if (!document.fullscreenElement && pBoton.getAttribute('pulsado')==='true') {
      pBoton.setAttribute('pulsado', 'false');
      pBoton.style.background = '';
    }
  });
*/
  //Si AR esta disponible / SI = llamar AR, AR pulsado, / NO = Bloquear boton AR e Indicar no Disponible
}
function fCaptura(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
    // Verificar soporte para captura de pantalla
    if (html2canvas !== undefined) {
      // Crear un enlace para descargar
      const vScreenShot = pContenedor.toDataURL('image/png') //.replace("image/png", "image/octet-stream");
      const anchor = document.createElement('a');
      anchor.href = vScreenShot; 
      // Obtener objeto Date con fecha/hora actual y obtener día, mes, año, hora, minutos y segundos
      const now = new Date();
      let day = '0' + now.getDate();
      let month = '0' + (now.getMonth() + 1 + '');
      let year = now.getFullYear();
      let hour = '0' + now.getHours();
      let minute = '0' + now.getMinutes();
      let second = '0' + now.getSeconds();
      // Formatear fecha y hora como string y concatenar
      fecha = day.slice(-2) + month.slice(-2) + year.toString();
      hora = hour.slice(-2) + minute.slice(-2) + second.slice(-2);
      anchor.download = 'MI3DCaptura-' + fecha + hora + '.png';
      anchor.click();
      vPulsado = fAnalisisBoton(pBoton, pBotones);
    } else {
      alert('Captura de pantalla no soportada'); 
    }
  }
}
function fCompartir(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
  }
}
function fGaleria(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
  }
}
function fDetalles(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
  }
}
function fInformacion(pBoton, pBotones, pContenedor) {
  if (pBoton.getAttribute('disponible') === '1') {
    vPulsado = fAnalisisBoton(pBoton, pBotones);
  }
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
//crear los hotsspot indicando q tiene variables
function fVariantesVisible(pContenedor, pTamano) {
  //Colocar hostspot en mesh si este tiene variantes
  //Leer archivo Json = GLTF
  let vC1 = 0;
  //let vTextoButton = [];
  fetch(pContenedor.src)
  .then(res => res.json())
  .then(data =>   {

//  console.log(data);
//  console.log('Examinando:', data.materials[0]);
//  console.log('variantes: ', data.extensions.KHR_materials_variants.variants);
//  console.log('Meshes: ', data.nodes);
      
    for (let i = 0; i < data.nodes.length; i++) {
      if (typeof data.materials[i].extensions !== 'undefined') {
        //console.log('Meshes:', data.nodes.length, 
        //    'Nombre:', data.nodes[i].name,
        //    'x:', data.nodes[i].translation[0],
        //    'z:', data.nodes[i].translation[1],
        //    'y:', data.nodes[i].translation[2],
        //    'Boton N:', vC1);
        vHPx = data.nodes[i].translation[0] / vDecimal;
        vHPz = data.nodes[i].translation[1] / vDecimal;
        vHPy = data.nodes[i].translation[2] / vDecimal;
        const oBoton = document.createElement('button');
          oBoton.id = 'HotSpotVariante';
          if (vVariantesPulsado) {
              oBoton.className = 'hotspot';
          } else {
              oBoton.className = 'hotspot hide';
          }
          oBoton.setAttribute('slot','hotspot' + `${vC1}`);
          oBoton.setAttribute('data-position',`${vHPx} ${vHPz} ${vHPy}`);
          oBoton.setAttribute('data-normal', '0 0 0');
          const oDetalle = document.createElement('div');
            oDetalle.className = 'classVariantAnnotation';
            oDetalle.innerHTML = data.nodes[i].name;
            oDetalle.style.color = 'rgba(0, 0, 0, 1)';
            //oDetalle.style.backgroundColor = 'rgba(215, 215, 215, 0.25)';
            oDetalle.style.position = 'absolute';
            oDetalle.style.transform = 'translate(-50%, 0px)';
            oDetalle.style.borderRadius = '4px';
            oDetalle.style.padding = '5px';
            oDetalle.style.filter = vBordeDestelloExterno;
            const oImg = document.createElement('img');
              oImg.setAttribute('id', 'idImg' + data.nodes[i].name);
              oImg.setAttribute('src', vRutaPrograma + 'imagenes/MI3D-Variantes.png');
              oImg.style.filter = vBordeDestelloExterno;
              oImg.style.height = pTamano;
            oDetalle.appendChild(oImg);
          oBoton.appendChild(oDetalle);
        pContenedor.appendChild(oBoton);
        //oBoton.style.zIndex = '100';
        vC1++;
      }
    }
  }) 
  .catch(error => {
    console.error('Error al obtener el archivo JSON:', error);
  });
};
function fTecla(pContenedor){
  document.addEventListener('keydown', function(evento) {
    console.log('Tecla Pulsada', evento.key);
  });
}
function fARSoportado() {
  // Función para verificar soporte de AR
  const isARSupported = () => {
    // Verificar soporte de WebXR
    const isWebXRSupported = navigator.xr !== undefined; 
    // Verificar soporte de AR Quick Look
    const isQuickLookSupported = window.QLPreviewController !== undefined;
    // Verificar soporte de ARKit / ARCore
    const isARKitSupported = window.webkit !== undefined && window.webkit.messageHandlers.getARKitData !== undefined;
    const isARCoreSupported = navigator.userAgent.indexOf('Android') >= 0 && /Version\/[89]/i.test(navigator.userAgent);
    return isWebXRSupported || isQuickLookSupported || isARKitSupported || isARCoreSupported;
  }
}