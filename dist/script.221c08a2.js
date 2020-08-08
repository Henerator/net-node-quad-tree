// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"geometric/classes/point.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Point =
/** @class */
function () {
  function Point(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.x = x;
    this.y = y;
  }

  Point.prototype.clone = function () {
    return new Point(this.x, this.y);
  };

  Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
  };

  Point.prototype.mul = function (point) {
    return new Point(this.x * point.x, this.y * point.y);
  };

  return Point;
}();

exports.Point = Point;
},{}],"geometric/classes/rect.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Rect =
/** @class */
function () {
  function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Object.defineProperty(Rect.prototype, "right", {
    get: function get() {
      return this.x + this.width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "bottom", {
    get: function get() {
      return this.y + this.height;
    },
    enumerable: true,
    configurable: true
  });

  Rect.prototype.changePosition = function (x, y) {
    return new Rect(x, y, this.width, this.height);
  };

  Rect.prototype.changeSize = function (widthRatio, heightRatio) {
    return new Rect(this.x, this.y, this.width * widthRatio, this.height * heightRatio);
  };

  return Rect;
}();

exports.Rect = Rect;
},{}],"geometric/classes/circle.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Circle =
/** @class */
function () {
  function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  return Circle;
}();

exports.Circle = Circle;
},{}],"geometric/classes/vector.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

exports.__esModule = true;

var index_1 = require("./index");

var Vector =
/** @class */
function (_super) {
  __extends(Vector, _super);

  function Vector() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Vector;
}(index_1.Point);

exports.Vector = Vector;
},{"./index":"geometric/classes/index.ts"}],"geometric/classes/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

exports.__esModule = true;

__export(require("./point"));

__export(require("./rect"));

__export(require("./circle"));

__export(require("./vector"));
},{"./point":"geometric/classes/point.ts","./rect":"geometric/classes/rect.ts","./circle":"geometric/classes/circle.ts","./vector":"geometric/classes/vector.ts"}],"classes/node.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var classes_1 = require("../geometric/classes");

var Node =
/** @class */
function () {
  function Node(x, y, radius, speedX, speedY) {
    this.pos = new classes_1.Point(x, y);
    this.radius = radius;
    this.speed = new classes_1.Vector(speedX, speedY);
  }

  Node.prototype.render = function (cntx) {
    // background
    cntx.beginPath();
    cntx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    cntx.arc(this.pos.x, this.pos.y, Math.floor(1.5 * this.radius), 0, 2 * Math.PI, false);
    cntx.fill(); // front node

    cntx.beginPath();
    cntx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    cntx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    cntx.fill();
  };

  ;
  return Node;
}();

exports.Node = Node;
},{"../geometric/classes":"geometric/classes/index.ts"}],"random/random.helper.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var RandomHelper =
/** @class */
function () {
  function RandomHelper() {}

  RandomHelper.range = function (min, max) {
    return min + Math.random() * (max - min);
  };

  RandomHelper.rangeInteger = function (min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  return RandomHelper;
}();

exports.RandomHelper = RandomHelper;
},{}],"geometric/geometric.helper.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var classes_1 = require("./classes");

var GeometricHelper =
/** @class */
function () {
  function GeometricHelper() {}

  GeometricHelper.degreeToRadian = function (degree) {
    return degree * Math.PI / 180;
  };

  GeometricHelper.distance = function (ptA, ptB) {
    var dx = ptB.x - ptA.x;
    var dy = ptB.y - ptA.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  GeometricHelper.ort = function (ptA, ptB) {
    var distance = this.distance(ptA, ptB);
    var dx = ptB.x - ptA.x;
    var dy = ptB.y - ptA.y;
    return new classes_1.Vector(dx / distance, dy / distance);
  };

  GeometricHelper.constrain = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  return GeometricHelper;
}();

exports.GeometricHelper = GeometricHelper;
},{"./classes":"geometric/classes/index.ts"}],"classes/link.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Link =
/** @class */
function () {
  function Link(pt1, pt2, trans) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.trans = trans;
  }

  Link.prototype.render = function (cntx) {
    cntx.beginPath();
    cntx.strokeStyle = 'rgba(255, 255, 255,' + this.trans + ')';
    cntx.moveTo(this.pt1.x, this.pt1.y);
    cntx.lineTo(this.pt2.x, this.pt2.y);
    cntx.stroke();
  };

  ;
  return Link;
}();

exports.Link = Link;
},{}],"geometric/intersection-detector.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var geometric_helper_1 = require("./geometric.helper");

var point_1 = require("./classes/point");

var IntersectionDetector =
/** @class */
function () {
  function IntersectionDetector() {}

  IntersectionDetector.PointToRect = function (pt, rect) {
    return pt.x >= rect.x && pt.x <= rect.right && pt.y >= rect.y && pt.y <= rect.bottom;
  };

  IntersectionDetector.PointToCircle = function (pt, circle) {
    var distance = geometric_helper_1.GeometricHelper.distance(pt, new point_1.Point(circle.x, circle.y));
    return distance <= circle.radius;
  };

  IntersectionDetector.RectToRect = function (rectA, rectB) {
    if (rectA.right >= rectB.x && rectA.x <= rectB.right && rectA.bottom >= rectB.y && rectA.y <= rectB.bottom) {
      return true;
    }

    return false;
  };

  IntersectionDetector.RectToCircle = function (rect, circle) {
    var testX = circle.x;
    var testY = circle.y;

    if (circle.x < rect.x) {
      testX = rect.x;
    } else if (circle.x > rect.right) {
      testX = rect.right;
    }

    if (circle.y < rect.y) {
      testY = rect.y;
    } else if (circle.y > rect.bottom) {
      testY = rect.bottom;
    }

    var distance = geometric_helper_1.GeometricHelper.distance(new point_1.Point(circle.x, circle.y), new point_1.Point(testX, testY));
    return distance <= circle.radius;
  };

  return IntersectionDetector;
}();

exports.IntersectionDetector = IntersectionDetector;
},{"./geometric.helper":"geometric/geometric.helper.ts","./classes/point":"geometric/classes/point.ts"}],"quad-tree/quad-tree.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var intersection_detector_1 = require("../geometric/intersection-detector");

var QuadTree =
/** @class */
function () {
  function QuadTree(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
  }

  QuadTree.prototype.insert = function (pt) {
    if (!intersection_detector_1.IntersectionDetector.PointToRect(pt, this.boundary)) {
      return false;
    }

    if (this.capacity > this.points.length) {
      this.points.push(pt.clone());
      return true;
    }

    if (!this.isSplitted) {
      this.split();
    }

    if (this.tlChild.insert(pt)) return true;
    if (this.trChild.insert(pt)) return true;
    if (this.blChild.insert(pt)) return true;
    if (this.brChild.insert(pt)) return true;
  };

  QuadTree.prototype.getRangePoints = function (range, rangePoints) {
    if (rangePoints === void 0) {
      rangePoints = [];
    }

    if (!intersection_detector_1.IntersectionDetector.RectToCircle(this.boundary, range)) {
      return rangePoints;
    }

    this.points.forEach(function (pt) {
      if (intersection_detector_1.IntersectionDetector.PointToCircle(pt, range)) {
        rangePoints.push(pt);
      }
    });

    if (!this.isSplitted) {
      return rangePoints;
    }

    this.tlChild.getRangePoints(range, rangePoints);
    this.trChild.getRangePoints(range, rangePoints);
    this.blChild.getRangePoints(range, rangePoints);
    this.brChild.getRangePoints(range, rangePoints);
    return rangePoints;
  };

  QuadTree.prototype.split = function () {
    this.tlChild = new QuadTree(this.boundary.changeSize(1 / 2, 1 / 2), this.capacity);
    var trChildRect = this.boundary.changePosition(this.boundary.x + this.boundary.width / 2, this.boundary.y).changeSize(1 / 2, 1 / 2);
    this.trChild = new QuadTree(trChildRect, this.capacity);
    var blChildRect = this.boundary.changePosition(this.boundary.x, this.boundary.y + this.boundary.height / 2).changeSize(1 / 2, 1 / 2);
    this.blChild = new QuadTree(blChildRect, this.capacity);
    var brChildRect = this.boundary.changePosition(this.boundary.x + this.boundary.width / 2, this.boundary.y + this.boundary.height / 2).changeSize(1 / 2, 1 / 2);
    this.brChild = new QuadTree(brChildRect, this.capacity);
    this.isSplitted = true;
  };

  return QuadTree;
}();

exports.QuadTree = QuadTree;
},{"../geometric/intersection-detector":"geometric/intersection-detector.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var classes_1 = require("./geometric/classes");

var node_1 = require("./classes/node");

var random_helper_1 = require("./random/random.helper");

var geometric_helper_1 = require("./geometric/geometric.helper");

var link_1 = require("./classes/link");

var quad_tree_1 = require("./quad-tree/quad-tree");

var canvas = document.getElementById('canvas');
var cntx = canvas.getContext('2d');
var width;
var height;
var LINK_DIST = 150;
var NODE_COUNT = 250;
var edgeLeft;
var edgeRight;
var edgeTop;
var edgeBottom;
var nodes = [];
var links = [];
var lastRenderTime;
var fps = 0;
var showFPS = false;
var animationId;
var animationInterval = 1000 / 10;
var animationNow;
var animationThen = Date.now();
var animationDelta;
var quadTreeRect;
var quadTree;
setup();
animate(update);

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  edgeTop = -LINK_DIST;
  edgeLeft = -LINK_DIST;
  edgeRight = width + LINK_DIST;
  edgeBottom = height + LINK_DIST;
  quadTreeRect = new classes_1.Rect(0, 0, width, height);
  lastRenderTime = Date.now();

  for (var i = 0; i < NODE_COUNT; i++) {
    nodes.push(getNewNode());
  }
}

function animate(action) {
  animationId = requestAnimationFrame(function frameAnimate() {
    //     animationNow = Date.now();
    //     animationDelta = animationNow - animationThen;
    animationId = requestAnimationFrame(frameAnimate); //     if (animationDelta > animationInterval) {

    action(); // animationThen = animationNow - (animationDelta % animationInterval);
    //     }
  });
}

function stopAnimation() {
  window.cancelAnimationFrame(animationId);
}

function clear() {
  cntx.clearRect(0, 0, width, height);
}

function draw() {
  clear();
  nodes.forEach(function (node) {
    node.render(cntx);
  });
  links.forEach(function (link) {
    link.render(cntx);
  }); // drawQuadTree();

  if (showFPS) {
    renderFPS();
  }
}

function drawQuadTree() {
  cntx.strokeStyle = 'red';
  drawQuadTreeRecursive(quadTree);
}

function drawQuadTreeRecursive(tree) {
  var rect = tree.boundary;
  cntx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  if (tree.tlChild) drawQuadTreeRecursive(tree.tlChild);
  if (tree.trChild) drawQuadTreeRecursive(tree.trChild);
  if (tree.blChild) drawQuadTreeRecursive(tree.blChild);
  if (tree.brChild) drawQuadTreeRecursive(tree.brChild);
}

function update() {
  var now = Date.now();
  updateFps(now);
  updateNodePos();
  findLink();
  draw();
  lastRenderTime = now;
}

function updateNodePos() {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].pos.x += nodes[i].speed.x;
    nodes[i].pos.y += nodes[i].speed.y; // Y downUpdate

    if (nodes[i].pos.y < edgeTop) {
      nodes[i] = getNewNode();
      nodes[i].pos.y = edgeBottom;
    } // Y topUpdate


    if (nodes[i].pos.y > edgeBottom) {
      nodes[i] = getNewNode();
      nodes[i].pos.y = edgeTop;
    } // X leftUpdate


    if (nodes[i].pos.x < edgeLeft) {
      nodes[i] = getNewNode();
      nodes[i].pos.x = edgeRight;
    } // X rightUpdate


    if (nodes[i].pos.x > edgeRight) {
      nodes[i] = getNewNode();
      nodes[i].pos.y = edgeLeft;
    }
  }
}

function updateFps(now) {
  var dt = (now - lastRenderTime) / 1000.0;
  fps = Math.floor(1 / dt);
}

function getNewNode() {
  var posX = random_helper_1.RandomHelper.rangeInteger(0, width);
  var posY = random_helper_1.RandomHelper.rangeInteger(-LINK_DIST, height + LINK_DIST);
  var radius = random_helper_1.RandomHelper.rangeInteger(6, 13);
  var speedX = random_helper_1.RandomHelper.range(-1.0, 1.0);
  var speedY = random_helper_1.RandomHelper.range(-1.0, 1.0);
  return new node_1.Node(posX, posY, radius, speedX, speedY);
}

function getDist(pt1, pt2) {
  return geometric_helper_1.GeometricHelper.distance(pt1, pt2);
}

function findLink() {
  quadTree = buildQuadTree();
  links = [];
  nodes.forEach(function (node) {
    var nodeRange = new classes_1.Circle(node.pos.x, node.pos.y, LINK_DIST);
    var nodePoints = quadTree.getRangePoints(nodeRange);
    nodePoints.forEach(function (nodePoint) {
      if (node.pos.x === nodePoint.x && node.pos.y === nodePoint.y) {
        return;
      }

      var dist = getDist(nodePoint, node.pos);
      var trans = 1 - dist / LINK_DIST;
      links.push(new link_1.Link(nodePoint, node.pos, trans));
    });
  });
}

function renderFPS() {
  cntx.fillStyle = 'red';
  cntx.font = 'normal 16pt Arial';
  cntx.fillText(fps + ' fps', 10, 26);
}

function buildQuadTree() {
  var quadTree = new quad_tree_1.QuadTree(quadTreeRect, 1);
  nodes.forEach(function (node) {
    quadTree.insert(node.pos);
  });
  return quadTree;
}
},{"./geometric/classes":"geometric/classes/index.ts","./classes/node":"classes/node.ts","./random/random.helper":"random/random.helper.ts","./geometric/geometric.helper":"geometric/geometric.helper.ts","./classes/link":"classes/link.ts","./quad-tree/quad-tree":"quad-tree/quad-tree.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52604" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map