function fCrearMedidas(pContenedor) {
  //Crear Lineas y Dots
  let oBotonLinea00 = document.createElement('button');
      oBotonLinea00.setAttribute('id', 'HotSpotDimension');
      oBotonLinea00.setAttribute('class', 'dot');
      oBotonLinea00.setAttribute('slot','hotspot-dot+X-Y+Z');
      oBotonLinea00.setAttribute('data-position','1 -1 1');
      oBotonLinea00.setAttribute('data-normal','1 0 0');
  pContenedor.appendChild(oBotonLinea00);
  let oBotonLinea01 = document.createElement('button');
      oBotonLinea01.setAttribute('id', 'HotSpotDimension');
      oBotonLinea01.setAttribute('class', 'dim');
      oBotonLinea01.setAttribute('slot', 'hotspot-dim+X-Y');
      oBotonLinea01.setAttribute('data-position', '1 -1 0');
      oBotonLinea01.setAttribute('data-normal', '1 0 0');
  pContenedor.appendChild(oBotonLinea01);
  let oBotonLinea02 = document.createElement('button');
      oBotonLinea02.setAttribute('id', 'HotSpotDimension');
      oBotonLinea02.setAttribute('class', 'dot');
      oBotonLinea02.setAttribute('slot', 'hotspot-dot+X-Y-Z');
      oBotonLinea02.setAttribute('data-position', '1 -1 -1');
      oBotonLinea02.setAttribute('data-normal', '1 0 0');
  pContenedor.appendChild(oBotonLinea02);
  let oBotonLinea03 = document.createElement('button');
      oBotonLinea03.setAttribute('id', 'HotSpotDimension');
      oBotonLinea03.setAttribute('class', 'dim');
      oBotonLinea03.setAttribute('slot', 'hotspot-dim+X-Z');
      oBotonLinea03.setAttribute('data-position', '1 0 -1');
      oBotonLinea03.setAttribute('data-normal', '1 0 0');
  pContenedor.appendChild(oBotonLinea03);
  let oBotonLinea04 = document.createElement('button');
      oBotonLinea04.setAttribute('id', 'HotSpotDimension');
      oBotonLinea04.setAttribute('class', 'dot');
      oBotonLinea04.setAttribute('slot', 'hotspot-dot+X+Y-Z');
      oBotonLinea04.setAttribute('data-position', '1 1 -1');
      oBotonLinea04.setAttribute('data-normal', '0 1 0');
      pContenedor.appendChild(oBotonLinea04);
  let oBotonLinea05 = document.createElement('button');
      oBotonLinea05.setAttribute('id', 'HotSpotDimension');
      oBotonLinea05.setAttribute('class', 'dim');
      oBotonLinea05.setAttribute('slot', 'hotspot-dim+Y-Z');
      oBotonLinea05.setAttribute('data-position', '0 -1 -1');
      oBotonLinea05.setAttribute('data-normal', '0 1 0');
  pContenedor.appendChild(oBotonLinea05);
      let oBotonLinea06 = document.createElement('button');
      oBotonLinea06.setAttribute('id', 'HotSpotDimension');
      oBotonLinea06.setAttribute('class', 'dot');
      oBotonLinea06.setAttribute('slot', 'hotspot-dot-X+Y-Z');
      oBotonLinea06.setAttribute('data-position', '-1 1 -1');
      oBotonLinea06.setAttribute('data-normal', '0 1 0');
  pContenedor.appendChild(oBotonLinea06);
      let oBotonLinea07 = document.createElement('button');
      oBotonLinea07.setAttribute('id', 'HotSpotDimension');
      oBotonLinea07.setAttribute('class', 'dim');
      oBotonLinea07.setAttribute('slot', 'hotspot-dim-X-Z');
      oBotonLinea07.setAttribute('data-position', '-1 0 -1');
      oBotonLinea07.setAttribute('data-normal', '-1 0 0');
  pContenedor.appendChild(oBotonLinea07);
  let oBotonLinea08 = document.createElement('button');
      oBotonLinea08.setAttribute('id', 'HotSpotDimension');
      oBotonLinea08.setAttribute('class', 'dot');
      oBotonLinea08.setAttribute('slot', 'hotspot-dot-X-Y-Z');
      oBotonLinea08.setAttribute('data-position', '-1 -1 -1');
      oBotonLinea08.setAttribute('data-normal', '-1 0 0');
  pContenedor.appendChild(oBotonLinea08);
  let oBotonLinea09 = document.createElement('button');
      oBotonLinea09.setAttribute('id', 'HotSpotDimension');
      oBotonLinea09.setAttribute('class', 'dim');
      oBotonLinea09.setAttribute('slot', 'hotspot-dim-X-Y');
      oBotonLinea09.setAttribute('data-position', '-1 -1 0');
      oBotonLinea09.setAttribute('data-normal', '-1 0 0');
  pContenedor.appendChild(oBotonLinea09);
  let oBotonLinea10 = document.createElement('button');
      oBotonLinea10.setAttribute('id', 'HotSpotDimension');
      oBotonLinea10.setAttribute('class', 'dot');
      oBotonLinea10.setAttribute('slot', 'hotspot-dot-X-Y+Z');
      oBotonLinea10.setAttribute('data-position', '-1 -1 1');
      oBotonLinea10.setAttribute('data-normal', '-1 0 0');
  pContenedor.appendChild(oBotonLinea10);
}
function fCrearLineas(pContenedor) {
//pContenedor.addEventListener('load', function() {
  let oSvg = document.createElement('svg');
      oSvg.setAttribute('id', 'idDimLines');
      oSvg.setAttribute('class', 'classDimensionLineContainer');
      oSvg.setAttribute('width', '100%');
      oSvg.setAttribute('height', '100%');
      oSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//                        oSvg.style.pointerEvents = 'none';
//                        oSvg.style.display = 'block';
//                        oSvg.style.position = 'absolute';
//                        oSvg.style.width = '100%';
//                        oSvg.style.height = '100%';
      for (i=0; i<5; i++) {
          let oLine1 = document.createElement('line');
              oLine1.setAttribute('class', 'classDimensionLine');
//                                oLine1.style.stroke = '#919191';
//                                oLine1.style.strokeWidth = '2';
//                                oLine1.style.strokeDasharray = '2';
              //oLine1.style.position = 'relative';
              //oLine1.style.width = '100%';
              //oLine1.style.height = '100%';
          oSvg.appendChild(oLine1);
      }
  pContenedor.appendChild(oSvg);
//    });
}

/** */
let vOpcionesMarco = '[' + 
'{ "id" : "00", "identificador" : "show-variantes", "texto" : "Variantes" },' +
'{ "id" : "01", "identificador" : "show-dimensions", "texto" : "Medidas" },' +
'{ "id" : "02", "identificador" : "show-leyenda", "texto" : "Ayuda" },' +
'{ "id" : "03", "identificador" : "show-informacion", "texto" : "Información" },' +
'{ "id" : "04", "identificador" : "show-pantalla", "texto" : "Pantalla Completa" }' +
']';
const oOpcionesMarco = JSON.parse(vOpcionesMarco);