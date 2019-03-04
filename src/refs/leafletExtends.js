import './leafletExtends.less';

let L = window.L;

/*
嘉兴天地图扩展
使用：
var vec = L.tileLayer.TDTJX({type: 'vec'});
var vec_anno = L.tileLayer.TDTJX({type: 'vec_anno'});
map = L.map('map', {
    crs: L.CRS.EPSG4490,
    center: [30.75, 120.75],
    zoom: 19
map.addLayer(vec);
*/
L.TileLayer.TDTJX = L.TileLayer.extend({
  urls: {
    vec: {
      g: {
        url: 'http://t0.tianditu.com/vec_c/wmts?tk=2b5132605fc11fcc5b0ac81cb31d1dd7',
        options: {
          layer: 'vec',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
        options: {
          layer: 'ZJEMAP_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },

      d: {
        // url: 'http://220.191.220.90/JXEMAP/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXEMAP/service/wmts ',
        options: {
          layer: 'JXEMAP',
          tilematrixSet: 'TileMatrixSet0',
          format: 'image/png',
        },
        // url: 'http://map.pinghu.gov.cn/geoservices/PHEMAP_205101/service/WMTS',
        // options: {
        //   layer: 'PHEMAP_205101',
        //   tilematrixSet: 'TileMatrixSet0',
        //   format: 'image/png',
        // },
      },
    },
    vec_anno: {
      g: {
        url: 'http://t0.tianditu.com/cva_c/wmts?tk=2b5132605fc11fcc5b0ac81cb31d1dd7',
        options: {
          layer: 'cva',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
        options: {
          layer: 'ZJEMAPANNO_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXEMAPANNO/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXEMAPANNO/service/wmts',
        options: {
          layer: 'JXEMAPANNO',
          tilematrixSet: 'TileMatrixSet0',
          format: 'image/png',
        },
        // url: 'http://map.pinghu.gov.cn/geoservices/PHEMAPANNO_201501/service/WMTS',
        // options: {
        //   layer: 'PHEMAPANNO_201501',
        //   tilematrixSet: 'TileMatrixSet0',
        //   format: 'image/png',
        // },
      },
    },
    img: {
      g: {
        url: 'http://t0.tianditu.com/img_c/wmts?tk=2b5132605fc11fcc5b0ac81cb31d1dd7',
        options: {
          layer: 'img',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJDOM_2D/wmts',
        options: {
          layer: 'ZJDOM_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/jpeg',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXIMG/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXIMG/service/wmts',
        options: {
          layer: 'JXIMG',
          tilematrixset: 'TileMatrixSet0',
          format: 'image/png',
        },
        // url: 'http://map.pinghu.gov.cn/geoservices/PHIMG_201501/service/WMTS',
        // options: {
        //   layer: 'PHIMG_201501',
        //   tilematrixSet: 'TileMatrixSet0',
        //   format: 'image/png',
        // },
      },
    },
    img_anno: {
      g: {
        url: 'http://t0.tianditu.com/cia_c/wmts?tk=2b5132605fc11fcc5b0ac81cb31d1dd7',
        options: {
          layer: 'cia',
          tilematrixSet: 'c',
          format: 'tile',
        },
      },
      s: {
        url: 'http://srv.zjditu.cn/ZJDOMANNO_2D/wmts',
        options: {
          layer: 'ZJDOMANNO_2D',
          tilematrixSet: 'esritilematirx',
          format: 'image/png',
        },
      },
      d: {
        // url: 'http://220.191.220.90/JXIMGANNO/service/wmts',
        url: 'http://www.jxmap.gov.cn/JXIMGANNO/service/wmts ',
        options: {
          layer: 'JXIMGANNO',
          tilematrixset: 'TileMatrixSet0',
          format: 'image/png',
        },
        // url: 'http://map.pinghu.gov.cn/geoservices/PHIMGANNO_201501/service/WMTS',
        // options: {
        //   layer: 'PHIMGANNO_201501',
        //   tilematrixset: 'TileMatrixSet0',
        //   format: 'image/png',
        // },
      },
    },
  },
  initialize: function(options) {
    this.type = options.type;
    L.extend(this.options, options);
    this.options.maxZoom = 20;
    this.options.minZoom = 0;
    var titleSize = 256;
    var baseOption = {
      width: titleSize,
      height: titleSize,
      service: 'WMTS',
      request: 'GetTile',
      version: '1.0.0',
      tileSize: 256,
      style: 'default',
      errorTileUrl: 'http://10.73.1.48/geosoc/Content/img/error.png',
    };
    for (var n in this.urls) {
      var urlCfg = this.urls[n];
      for (var m in urlCfg) {
        urlCfg[m].options = L.extend(urlCfg[m].options, baseOption);
      }
    }
  },
  onAdd: function(map) {
    L.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function(tilePoint) {
    var urlOption = this.getUrlOption(this.type, tilePoint.z);
    var url = urlOption.url;
    url = L.Util.template(url, { s: this._getSubdomain(tilePoint) });
    return (
      url +
      L.Util.getParamString(urlOption.options, url) +
      '&tilematrix=' +
      tilePoint.z +
      '&tilerow=' +
      tilePoint.y +
      '&tilecol=' +
      tilePoint.x
    );
  },
  getUrlOption: function(type, zoom) {
    return this._getUrlOptionsByZoom(this.urls[type], zoom);
  },
  _getUrlOptionsByZoom: function(opt, zoom) {
    //0-13级使用国家服务
    if (zoom < 14) return opt.g;
    //14-17级使用省厅服务
    else if (zoom < 18) return opt.s;
    //18-20级使用地市级
    else return opt.d;
  },
});
/*
    options:{
        type:'vec'['vec_anno','img','img_anno']
    }
*/
L.tileLayer.TDTJX = function(options) {
  return new L.TileLayer.TDTJX(options);
};

/*
  type "vec","vec_anno","img","img_anno"
*/
L.tileLayer.getGroupLayer = (types, options) => {
  let group = L.layerGroup();
  options = options || {};
  for (let t of types) {
    options.type = t;
    group.addLayer(L.tileLayer.TDTJX(options));
  }
  return group;
};

L.CRS.EPSG4490 = L.extend({}, L.CRS.EPSG4326, {
  code: 'EPSG:4490',
  transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.25),
});

L.drawLocal.draw.handlers = L.extend(L.drawLocal.draw.handlers, {
  marker: {
    tooltip: {
      start: '点击放置',
    },
  },
  polygon: {
    tooltip: {
      start: '点击开始',
      cont: '点击继续',
      end: '点击起始点完成',
    },
  },
  polyline: {
    tooltip: {
      start: '点击开始',
      cont: '点击继续',
      end: '双击完成',
    },
  },
});

L.Draw.Feature = L.Draw.Feature.include({
  _fireCreatedEvent: function(layer) {
    this._map.fire(L.Draw.Event.CREATED, { layer: layer, layerType: this.type });
    this.fire(L.Draw.Event.CREATED, { layer: layer, layerType: this.type });
  },
});

var defaultPrecision = {
  km: 2,
  ha: 2,
  m: 0,
  mi: 2,
  ac: 2,
  yd: 0,
  ft: 0,
  nm: 2,
};

L.GeometryUtil.readableArea = function(area, isMetric, precision) {
  var areaStr,
    units,
    precision = L.Util.extend({}, defaultPrecision, precision);

  if (isMetric) {
    units = ['km', 'm'];
    var type = typeof isMetric;
    if (type === 'string') {
      units = [isMetric];
    } else if (type !== 'boolean') {
      units = isMetric;
    }

    if (area >= 1000000 && units.indexOf('km') !== -1) {
      areaStr = L.GeometryUtil.formattedNumber(area * 0.000001, precision['km']) + ' km²';
    } else {
      areaStr = L.GeometryUtil.formattedNumber(area, precision['m']) + ' m²';
    }
  } else {
    area /= 0.836127; // Square yards in 1 meter

    if (area >= 3097600) {
      //3097600 square yards in 1 square mile
      areaStr = L.GeometryUtil.formattedNumber(area / 3097600, precision['mi']) + ' mi²';
    } else if (area >= 4840) {
      //4840 square yards in 1 acre
      areaStr = L.GeometryUtil.formattedNumber(area / 4840, precision['ac']) + ' acres';
    } else {
      areaStr = L.GeometryUtil.formattedNumber(area, precision['yd']) + ' yd²';
    }
  }

  return areaStr;
};

L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ',',
    emptyString: '经度 : 0  纬度: 0',
    lngFirst: true,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: '',
  },

  onAdd: function(map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
  },

  onRemove: function(map) {
    map.off('mousemove', this._onMouseMove);
  },

  _onMouseMove: function(e) {
    var lng = this.options.lngFormatter
      ? this.options.lngFormatter(e.latlng.lng)
      : //L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        e.latlng.lng.toFixed(this.options.numDigits);
    var lat = this.options.latFormatter
      ? this.options.latFormatter(e.latlng.lat)
      : //L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        e.latlng.lat.toFixed(this.options.numDigits);

    var value = this.options.lngFirst
      ? `经度 : ${lng} ${this.options.separator}  纬度 : ${lat}`
      : `经度 : ${lat} ${this.options.separator}  纬度 : ${lng}`;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  },
});

export default L;