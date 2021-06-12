"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableKeywords = exports.getBrands = exports.fetchProduct = exports.fetchProductsBySkus = exports.fetchProducts = void 0;

var _product = require("./api/firestore/product");

/* export const fetchProducts = (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    return fetchAwinProducts(path, page, LIMIT, LAST_NODES, filter);
}

export const fetchProductsBySkus = (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
    return fetchAwinProductsBySkus(skus, page, LIMIT, LAST_DOC, exclusion);
}

export const fetchProduct = (sku) => {
    return fetchAwinProduct(sku);
} */
var fetchProducts = function fetchProducts() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var LIMIT = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var LAST_NODES = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var filter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return (0, _product.fetchFirestoreProducts)(path, page, LIMIT, LAST_NODES, filter);
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

var getBrands = function getBrands(category) {
  var res;
  return regeneratorRuntime.async(function getBrands$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = [];
          /* if(sessionStorage.getItem('available_brands')){
              res = JSON.parse(sessionStorage.getItem('available_brands'));
          } */

          return _context.abrupt("return", (0, _product.fetchProductBrands)(category));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBrands = getBrands;

var getAvailableKeywords = function getAvailableKeywords() {
  var res;
  return regeneratorRuntime.async(function getAvailableKeywords$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = [];

          if (!sessionStorage.getItem('available_keys')) {
            _context2.next = 5;
            break;
          }

          res = JSON.parse(sessionStorage.getItem('available_keys'));
          _context2.next = 9;
          break;

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _product.fetchAvailableCategories)());

        case 7:
          res = _context2.sent;
          sessionStorage.setItem('available_keys', JSON.stringify(res));

        case 9:
          return _context2.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAvailableKeywords = getAvailableKeywords;

var isSearchKeyPresent = function isSearchKeyPresent(key) {
  var available, _key, keys, res, i;

  return regeneratorRuntime.async(function isSearchKeyPresent$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          available = false;
          _context3.prev = 1;
          _key = _key.toLowerCase();
          _context3.next = 5;
          return regeneratorRuntime.awrap(getAvailableKeywords());

        case 5:
          keys = _context3.sent;
          res = [];
          keys = keys || [];
          i = 0;

        case 9:
          if (!(i < keys.length)) {
            _context3.next = 16;
            break;
          }

          if (!(keys[i] === _key)) {
            _context3.next = 13;
            break;
          }

          available = true;
          return _context3.abrupt("break", 16);

        case 13:
          i++;
          _context3.next = 9;
          break;

        case 16:
          _context3.next = 20;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](1);

        case 20:
          return _context3.abrupt("return", available);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 18]]);
};