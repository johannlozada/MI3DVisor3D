function fImagenSVG (pPadre, pTamano, pColor, pInformacion, pArchivoSvg, pOrden) {
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