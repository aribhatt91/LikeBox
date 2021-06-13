"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableKeywords = exports.getBrands = exports.fetchProduct = exports.fetchProductsBySkus = exports.fetchProducts = void 0;

var _product = require("./api/firestore/product");

var fetchProducts = function fetchProducts() {
  var path,
      page,
      LIMIT,
      LAST_NODES,
      filter,
      categories,
      paths,
      availableKeywords,
      len,
      j,
      i,
      _args = arguments;
  return regeneratorRuntime.async(function fetchProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
          page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
          LIMIT = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10;
          LAST_NODES = _args.length > 3 && _args[3] !== undefined ? _args[3] : [];
          filter = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};
          categories = [], paths = path.split('-');
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(getAvailableKeywords());

        case 9:
          availableKeywords = _context.sent;
          availableKeywords = availableKeywords || [];
          len = availableKeywords.length;

          for (j = 0; j < paths.length; j++) {
            for (i = 0; i < len; i++) {
              if (availableKeywords[i].toLowerCase().indexOf(paths[j].toLowerCase()) === 0) {
                categories.push(availableKeywords[i]);
              }
            }
          }

          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](6);
          console.error('getBrands:error: ', _context.t0);

        case 18:
          return _context.abrupt("return", (0, _product.fetchFirestoreProducts)(categories, page, LIMIT, LAST_NODES, filter));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 15]]);
};

exports.fetchProducts = fetchProducts;

var fetchProductsBySkus = function fetchProductsBySkus() {
  var skus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var LIMIT = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var LAST_DOC = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var exclusion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return (0, _product.fetchFirestoreProductsBySkus)(skus, page, LIMIT, LAST_DOC, exclusion);
};

exports.fetchProductsBySkus = fetchProductsBySkus;

var fetchProduct = function fetchProduct(sku) {
  return (0, _product.fetchFirestoreProduct)(sku);
};

exports.fetchProduct = fetchProduct;

var getBrands = function getBrands(slug) {
  var paths, categories, availableKeywords, len, j, i;
  return regeneratorRuntime.async(function getBrands$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('getBrands', slug);
          paths = slug.split('-');
          categories = [];
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(getAvailableKeywords());

        case 6:
          availableKeywords = _context2.sent;
          availableKeywords = availableKeywords || [];
          len = availableKeywords.length;

          for (j = 0; j < paths.length; j++) {
            for (i = 0; i < len; i++) {
              if (availableKeywords[i].toLowerCase().indexOf(paths[j].toLowerCase()) === 0) {
                categories.push(availableKeywords[i]);
              }
            }
          }

          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          console.error('getBrands:error: ', _context2.t0);

        case 15:
          return _context2.abrupt("return", (0, _product.fetchProductBrands)(categories));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 12]]);
};

exports.getBrands = getBrands;

var getAvailableKeywords = function getAvailableKeywords() {
  var res;
  return regeneratorRuntime.async(function getAvailableKeywords$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = [];

          if (!(window.sessionStorage && sessionStorage.getItem('available_keys'))) {
            _context3.next = 5;
            break;
          }

          res = JSON.parse(sessionStorage.getItem('available_keys')); //window.mlog('Fetching from storage', res);

          _context3.next = 9;
          break;

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap((0, _product.fetchAvailableCategories)());

        case 7:
          res = _context3.sent;
          sessionStorage.setItem('available_keys', JSON.stringify(res));

        case 9:
          return _context3.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getAvailableKeywords = getAvailableKeywords;

var isSearchKeyPresent = function isSearchKeyPresent(query) {
  var available, res, search, avkeys, i;
  return regeneratorRuntime.async(function isSearchKeyPresent$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          available = false, res = new Set();
          _context4.prev = 1;
          search = query.toLowerCase().split('-');
          _context4.next = 5;
          return regeneratorRuntime.awrap(getAvailableKeywords());

        case 5:
          avkeys = _context4.sent;
          avkeys = avkeys || [];
          i = 0;

        case 8:
          if (!(i < avkeys.length)) {
            _context4.next = 17;
            break;
          }

          if (!(search.indexOf(avkeys[i].toLowerCase()) > -1)) {
            _context4.next = 14;
            break;
          }

          available = true;
          res.add(avkeys[i]);

          if (!(res.size() === search.length)) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("break", 17);

        case 14:
          i++;
          _context4.next = 8;
          break;

        case 17:
          _context4.next = 21;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](1);

        case 21:
          return _context4.abrupt("return", new Promise(function (resolve) {
            return resolve(Array.from(res));
          }));

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 19]]);
};

var getNearestMatches = function getNearestMatches(query) {
  return regeneratorRuntime.async(function getNearestMatches$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
        case "end":
          return _context5.stop();
      }
    }
  });
};