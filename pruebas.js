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