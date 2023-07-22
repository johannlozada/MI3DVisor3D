function fImagenSVG1 (pPadre, pTamano, pColor, pInformacion, pArchivoSvg, pOrden) {
    vMargen = 3;
    vTamano = 0;
    vTamano = parseInt(pTamano) - vMargen;
    let vSVGtxt = '';
    fetch(pArchivoSvg)
      .then(response => response.text())
      .then(oSvgData => {
          // extraer desde "<path " hasta "z"/>"
          console.log(oSvgData);
          //vSVGtxt = oSvgData.slice(oSvgData.search('<path'), oSvgData.search('z"/>')+4);
          vSVGtxt = oSvgData.slice(oSvgData.search('d="M')+3, oSvgData.search('z"/>')+1);
          //console.log(vSVGtxt);

          var oDiv = document.createElement('div');
            oDiv.setAttribute('id','id'+pInformacion);
            oDiv.style.display = 'flex';
            oDiv.style.position = 'absolute';
            //oDiv.style.position = 'absolute';
            var oSVG = document.createElement('svg');
              oSVG.style.width = pTamano;
              oSVG.style.height = pTamano;
              //oContenedor.setAttribute('display','none');
              //oSVG.setAttribute('width',pTamano);
              //oSVG.setAttribute('height',pTamano);
              oSVG.setAttribute('viewBox','0 0 8 8');
              //var oDefs = document.createElement('defs');
              //    var oStyle = document.createElement('style');
              //      oStyle.setAttribute('type','text/css');
              //      oStyle.innerHTML = '.fil0 {fill: ' + pColor + '; fill-rule: nonzero}'
              //    oDefs.appendChild(oStyle);
              //oSVG.appendChild(oDefs);
              //var oGLabel = document.createElement('g');
              //    oGLabel.setAttribute('id', 'SECTIONCUTEDGES');
                  var oPath = document.createElement('path');
                    oPath.setAttribute('class','fil0');
                    oPath.setAttribute('fill','red');
                    oPath.setAttribute('d',vSVGtxt);
                  oSVG.appendChild(oPath);
              //oSVG.appendChild(oGLabel);
              oDiv.appendChild(oSVG);
          pPadre.appendChild(oDiv);
        })
      .catch(error => {
        console.error('Error al cargar el archivo SVG:', error);
      })
  }

  function fImagenSVG2 (pPadre, pTamano, pColor, pInformacion, pArchivoSvg, pOrden) {
    vMargen = 3;
    vTamano = 0;
    vTamano = parseInt(pTamano) - vMargen;
    fetch(pArchivoSvg)
      .then(response => response.text())
      .then(oSvgData => {
          // Modificar el contenido del SVG necesario
          vLlamarFuncion = 'f' + pInformacion.replace(/ /g,'');
          //const xxx = fOpciones.toString();
          //const xxx = pPadre;
          //console.log(pPadre.innerHTML);
          var modifiedSVG = oSvgData.replace('svg xmlns=', 'svg id="' + pInformacion + '" onclick="' + vLlamarFuncion + '(' + 100 + ',' + 500 + ')" xmlns=');
          if (pInformacion != '-') {
            modifiedSVG = modifiedSVG.replace('fill:black', 'fill:' + pColor);
            modifiedSVG = modifiedSVG.replace('<style type="text/css">', '<style type="text/css"> #' + pInformacion + ':hover { transform: scale(1.1); }');
            modifiedSVG = modifiedSVG.replace('</g>', '</g><title id="idTitulo">' + pInformacion + '</title>');
            //modifiedSVG = modifiedSVG.replace(/width="\b[\w?*.]+/, 'width="' + vTamano.toString());
            //modifiedSVG = modifiedSVG.replace(/height="\b[\w?*.]+/, 'height="' + vTamano.toString());
            pPadre.innerHTML =  pPadre.innerHTML + modifiedSVG;
            oContenedor = document.getElementById(pInformacion);
            oContenedor.style.cursor = 'pointer';
            oContenedor.style.width = vTamano.toString() + 'px';
            oContenedor.style.height = vTamano.toString() + 'px';
            oContenedor.style.margin = vMargen.toString() + 'px';
            if (pOrden > 100) {
              oContenedor.style.display = 'none';
            }
          }
          else {
            if (pOrden > 100) {
              pPadre.innerHTML = pPadre.innerHTML + '<div class="separador" style="height: 10px; display: none;"></div>';
            }
            else {
              pPadre.innerHTML = pPadre.innerHTML + '<div class="separador" style="height: 10px;"></div>';
            }
          }
          return 'valor';
        })
      .catch(error => {
        console.error('Error al cargar el archivo SVG:', error);
      })
  }


//***********************************************

//pDisposicion: L(R-L) P(T-B) = Landscape Right Left - Portrait Top Bottom / Ejemplos LR (Landscape hacia la Derecha)
function fBarraHerramienta (pPadre, pId, pPosX, pPosY, pTamano, pEstado, pColores1, pColores2, pOpciones, pDisposicion) {
  vVentana = fTipoPantalla();
  vTamanoBarra = 0;
  vPos01 = pDisposicion.slice(0,1);
  vPos02 = pDisposicion.slice(2,3);
  if (vVentana=='movil|horizontal') {
    vPos01 = 'L';
  }
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
      oContenedor.style.width = pTamano;
      oContenedor.style.filter = vSombraUp;
      oContenedor.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.5)';
      for (let i = 0; i < pOpciones.length; i++) {
        fImagenImg(oContenedor, pTamano, pColores2, pOpciones[i].titulo, pOpciones[i].imagen, i, pOpciones);
        if (pOpciones[i].titulo  == '-') {
          vTamanoBarra = vTamanoBarra + 10;
        }
        else {
          vTamanoBarra = vTamanoBarra + 50;
        }
      };
    pPadre.appendChild(oContenedor);
    console.log(oContenedor.getBoundingClientRect().top + vTamanoBarra, oContenedor.getBoundingClientRect().left + vTamanoBarra);
    console.log(vTamanoBarra, screen.width, screen.height);
    if ((oContenedor.getBoundingClientRect().top + vTamanoBarra) < screen.height) {
      console.log('Barra de herramientas es mas alto que pantalla');
    }

/*
    if (vPos01 === 'L') { // Si es Landscape = Horizontal
      oContenedor.style.flexFlow = 'row wrap';
      if (vPos02 === 'R') { // Hacia la derecha
        oContenedor.style.flexDirection = 'row';
      }
      if (vPos02 === 'L') { // Hacia la izquierda
        oContenedor.style.flexDirection = 'row-reverse';
      }
    }
    if (vPos01 === 'P') { // Si es Portraid = Vertical
      oContenedor.style.flexFlow = 'column wrap';
      if (vPos02 === 'T') { // Hacia Arriba
        oContenedor.style.flexDirection = 'column-reverse';
      }
      if (vPos02 === 'B') { // Hacia la Abajo
        oContenedor.style.flexDirection = 'column';
      }
    }
*/
  });
}
//*************************************
//pDisposicion: L(R-L) P(T-B) = Landscape Right Left - Portrait Top Bottom / Ejemplos LR (Landscape hacia la Derecha)
function fBarraHerramienta (pPadre, pId, pPosX, pPosY, pTamano, pEstado, pColores1, pColores2, pBotones, pDisposicion) {
  vTamanoBarra = 0;
  //vPos01 = pDisposicion.slice(0,1);
  //vPos02 = pDisposicion.slice(2,3);
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
      oContenedor.style.width = pTamano;
      oContenedor.style.filter = vSombraUp;
      oContenedor.style.background = 'rgba(' + parseInt(pColores2[1]+pColores2[2],16) +', ' + parseInt(pColores2[3]+pColores2[4],16) + ', ' + parseInt(pColores2[5]+pColores2[6],16) + ', 0.5)';
      for (let i = 0; i < pBotones.length; i++) {
        if (pBotones[i].titulo  == '-') {
          vTamanoBarra = vTamanoBarra + 10;
        }
        else {
          vTamanoBarra = vTamanoBarra + 50;
        }
        fImagenImg(oContenedor, pTamano, pColores2, pBotones[i].titulo, pBotones[i].imagen, i, pBotones);
      };
    pPadre.appendChild(oContenedor);
    console.log('barra: ', vTamanoBarra, 'Alto + :', oContenedor.getBoundingClientRect().top + vTamanoBarra, 'Ancho + :', oContenedor.getBoundingClientRect().left + vTamanoBarra, 
      'Alto - :', oContenedor.getBoundingClientRect().top - vTamanoBarra, 'Ancho - :', oContenedor.getBoundingClientRect().left - vTamanoBarra);
    if (pDisposicion === 'L') {
      if ((oContenedor.getBoundingClientRect().left + vTamanoBarra) < screen.width) { // si Left + Ancho barra < tamaño pantalla
        oContenedor.style.flexFlow = 'row';
      }
      else {
        if ((oContenedor.getBoundingClientRect().left - vTamanoBarra) > 0) { // si Left - Ancho barra > 0
          oContenedor.style.flexFlow = 'row';
          oContenedor.style.flexDirection = 'row-reverse';
        }
        else {
          oContenedor.style.flexFlow = 'column';
          if ((oContenedor.getBoundingClientRect().top + vTamanoBarra) > screen.height) {
            oContenedor.style.flexDirection = 'column-reverse';
          }
        }
      }
    }
    if (pDisposicion === 'P') {
      if ((oContenedor.getBoundingClientRect().top + vTamanoBarra) < screen.height) { // si Top + Alto barra < tamaño pantalla
        oContenedor.style.flexFlow = 'column wrap';
      }
      else { // si Top + Alto barra > tamaño pantalla
        if ((oContenedor.getBoundingClientRect().top - vTamanoBarra) > 0) { // si Top - Alto barra > 0
          oContenedor.style.flexFlow = 'column wrap';
          oContenedor.style.flexDirection = 'column-reverse';
        }
        else {
          oContenedor.style.flexFlow = 'row';
          if ((oContenedor.getBoundingClientRect().left + vTamanoBarra) > screen.width) {
            oContenedor.style.flexDirection = 'row-reverse';
          }
        }
      }
    }
  });
}
function fImagenImg(pPadre, pTamano, pColores, pTitulo, pArchivoIMG, pIndice, pBotones) {
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
      oImg.setAttribute('title', pTitulo);
      oImg.setAttribute('pulsado', false);
      oImg.setAttribute('class', 'classNivel00');
      oImg.style.width = pTamano;
      oImg.style.margin = '2.5px';
      oImg.style.filter = vSombraUp;
      oImg.style.display = 'flex';
      oImg.style.borderRadius = '2px 2px 2px 2px';
      oImg.style.opacity = '1';
      oImg.style.justifyContent = 'center';
      oImg.style.alignItems = 'center';
      if (pTitulo != '-') {
        oImg.style.cursor = 'pointer';
        oImg.addEventListener('click', function() {
          var vfuncion = eval('f'+pTitulo);
          vfuncion(document.querySelector('#' + 'id' + pTitulo), oDiv);
        });
        var oStyle = document.createElement('style');
          oStyle.setAttribute('type','text/css');
          oStyle.innerHTML = '#' + 'id' + pTitulo + ':hover { transform: scale(1.1); } ';
        oImg.appendChild(oStyle);
      }
    oDiv.appendChild(oImg);
  pPadre.appendChild(oDiv);
  if (pIndice>0) {
    oImg.style.display = 'none';
    oImg.setAttribute('class', 'classNivel01');
  }
}