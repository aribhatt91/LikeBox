"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAvailableCategories = exports.fetchProductBrands = exports.fetchFirestoreProduct = exports.fetchFirestoreProductsBySkus = exports.fetchFirestoreProducts = void 0;

var _firebase = require("./../firebase");

var _lodash = require("lodash");

var _Product = require("./models/Product");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var collection = _firebase.db.collection('products');

var brandsCollection = _firebase.db.collection('brands');

var categoriesCollection = _firebase.db.collection('categories');
/* Take a query and a filter object. 
Add database filtering to the query and return the query object */


var applyFilter = function applyFilter(query, filterObject) {
  if (!query || !filterObject) {
    return query;
  }

  window.mlog('applyFilter', query, filterObject);

  if (filterObject.sortby) {
    var order = filterObject.sortby.selected;

    if (order && order !== "") {
      if (order.indexOf(':') > -1) {
        query = query.orderBy(order.split(":")[0], order.split(":")[1]);
      }
    }
  }

  if (filterObject.brands) {
    var brands = filterObject.brands.selected || [];

    if (brands && Array.isArray(brands) && brands.length > 0) {
      brands = brands.slice(0, 10);
      query = query.where('brand', 'in', brands);
    }
  }

  if (filterObject.gender) {
    var gender = filterObject.gender.selected || [];

    if (gender && Array.isArray(gender)) {
      if (gender.indexOf('m') > -1 && gender.indexOf('f') > -1) {//do nothing
      } else if (gender.indexOf('m') > -1) {
        query = query.where('searchTerms.mens', '==', true);
      } else if (gender.indexOf('f') > -1) {
        query = query.where('searchTerms.womens', '==', true);
      }
    }
  }

  if (filterObject.price) {//TODO
  }

  window.mlog('applyFilter', query, filterObject);
  return query;
};
/* 
fetch products by path
1. Break down the path and 
*/


var fetchFirestoreProducts = function fetchFirestoreProducts() {
  var queryPaths,
      page,
      LIMIT,
      LAST_NODES,
      filterObject,
      res,
      queries,
      q1,
      q2,
      p1,
      p2,
      _ref,
      _ref2,
      p1Snap,
      p2Snap,
      dump,
      lastVisible,
      q,
      querySnapshot,
      _lastVisible,
      _args = arguments;

  return regeneratorRuntime.async(function fetchFirestoreProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryPaths = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
          page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
          LIMIT = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10;
          LAST_NODES = _args.length > 3 && _args[3] !== undefined ? _args[3] : [];
          filterObject = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
          window.mlog('Product category ->', queryPaths);
          res = null;
          _context.prev = 7;

          if (!(queryPaths.length > 1)) {
            _context.next = 30;
            break;
          }

          /* Logical OR operation */
          queries = [];
          queryPaths.forEach(function (item) {
            if ((item || "").trim() !== "") {
              queries.push('searchTerms.' + (item || "").trim());
            }
          });
          q1 = collection.where(queries[0], '==', true), q2 = collection.where(queries[1], '==', true);

          if (filterObject) {
            q1 = applyFilter(q1, filterObject);
            q2 = applyFilter(q2, filterObject);
          }

          if (LAST_NODES && Array.isArray(LAST_NODES) && LAST_NODES.length >= 2) {
            q1 = q1.startAfter(LAST_NODES[0]);
            q2 = q2.startAfter(LAST_NODES[0]);
          }

          q1 = q1.limit(LIMIT);
          q2 = q2.limit(LIMIT);
          p1 = q1.get(), p2 = q2.get();
          _context.next = 19;
          return regeneratorRuntime.awrap(Promise.all([p1, p2]));

        case 19:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 2);
          p1Snap = _ref2[0];
          p2Snap = _ref2[1];
          dump = (0, _lodash.concat)(p1Snap.docs, p2Snap.docs);
          lastVisible = [p1Snap.docs[p1Snap.docs.length - 1], p2Snap.docs[p2Snap.docs.length - 1]];
          res = {
            lastVisible: lastVisible
          };
          res.items = (0, _lodash.uniqWith)(dump, _lodash.isEqual).map(function (doc) {
            var item = doc.data();

            if (item.affiliate === 'cj') {
              return (0, _Product.convertCJToProduct)(item, doc.id);
            } else if (item.affiliate === 'awin') {
              return (0, _Product.convertAwinToProduct)(doc.data(), doc.id);
            }
          });
          window.mlog('2: Fetched Firestore products for path -> ', queryPaths.join('-'), '  --->', res);
          _context.next = 42;
          break;

        case 30:
          if (!(queryPaths.length === 1)) {
            _context.next = 42;
            break;
          }

          //window.mlog('BP3', queryPaths, ('searchTerms.' + (queryPaths[0] || "").trim()));
          q = collection.where('searchTerms.' + (queryPaths[0] || "").trim(), '==', true);

          if (LAST_NODES && Array.isArray(LAST_NODES) && LAST_NODES.length >= 1) {
            q = q.startAfter(LAST_NODES[0]);
          }

          if (filterObject) {
            q = applyFilter(q, filterObject);
          }

          q = q.limit(LIMIT);
          _context.next = 37;
          return regeneratorRuntime.awrap(q.get());

        case 37:
          querySnapshot = _context.sent;
          _lastVisible = [querySnapshot.docs[querySnapshot.docs.length - 1]];
          res = {
            lastVisible: _lastVisible
          };
          res.items = (querySnapshot.docs || []).map(function (doc) {
            var item = doc.data();

            if (item.affiliate === 'cj') {
              return (0, _Product.convertCJToProduct)(item, doc.id);
            } else if (item.affiliate === 'awin') {
              return (0, _Product.convertAwinToProduct)(doc.data(), doc.id);
            }
          });
          window.mlog('1: Fetched Firestore products for path -> ', queryPaths[0], '--->', res);

        case 42:
          _context.next = 48;
          break;

        case 44:
          _context.prev = 44;
          _context.t0 = _context["catch"](7);
          console.error('fetchFirestoreProducts:error', _context.t0);
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context.t0);
          }));

        case 48:
          return _context.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 49:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 44]]);
}; //https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
//db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()


exports.fetchFirestoreProducts = fetchFirestoreProducts;

var fetchFirestoreProductsBySkus = function fetchFirestoreProductsBySkus() {
  var skus,
      page,
      LIMIT,
      LAST_DOC,
      exclusion,
      res,
      query,
      querySnapshot,
      docs,
      items,
      lastVisible,
      _args2 = arguments;
  return regeneratorRuntime.async(function fetchFirestoreProductsBySkus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          skus = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
          page = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 0;
          LIMIT = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 10;
          LAST_DOC = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
          exclusion = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : false;
          res = [];
          _context2.prev = 6;
          query = null;

          if (!exclusion) {
            query = collection.where(_firebase.fieldPath.documentId(), 'in', skus || []);
          } else {
            query = collection;
            skus = (skus || []).filter(function (item) {
              return item && typeof item === "string";
            });

            if ((skus || []).length > 0) {
              query = query.where(_firebase.fieldPath.documentId(), 'not-in', skus || []);
            }
          }

          if (LAST_DOC && page > 1) {
            query = query.startAfter(LAST_DOC);
          }

          query = query.limit(LIMIT);
          _context2.next = 13;
          return regeneratorRuntime.awrap(query.get());

        case 13:
          querySnapshot = _context2.sent;
          docs = querySnapshot.docs;
          items = docs.map(function (doc) {
            var item = doc.data();

            if (item.affiliate === 'cj') {
              return (0, _Product.convertCJToProduct)(item, doc.id);
            } else if (item.affiliate === 'awin') {
              return (0, _Product.convertAwinToProduct)(doc.data(), doc.id);
            }
          });
          lastVisible = docs[docs.length - 1];
          res = {
            lastVisible: lastVisible,
            items: items
          };
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](6);
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context2.t0);
          }));

        case 23:
          return _context2.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 20]]);
};

exports.fetchFirestoreProductsBySkus = fetchFirestoreProductsBySkus;

var fetchFirestoreProduct = function fetchFirestoreProduct(sku) {
  var res, doc, item;
  return regeneratorRuntime.async(function fetchFirestoreProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sku = (sku || "").toLowerCase();
          res = null;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(collection.doc(sku).get());

        case 5:
          doc = _context3.sent;
          item = doc.data();

          if (item.affiliate === 'cj') {
            res = (0, _Product.convertCJToProduct)(item, doc.id);
          } else if (item.affiliate === 'awin') {
            res = (0, _Product.convertAwinToProduct)(item, doc.id);
          }

          window.mlog('fetchFirestoreProduct:response', res);
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          console.error('fetchFirestoreProduct:error', _context3.t0);
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context3.t0);
          }));

        case 15:
          return _context3.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.fetchFirestoreProduct = fetchFirestoreProduct;

var fetchProductBrands = function fetchProductBrands(categories) {
  var category, query, brandsQuerySnapshot, brands, availableBrandsDocs, res;
  return regeneratorRuntime.async(function fetchProductBrands$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          category = categories[0];
          query = brandsCollection;
          window.mlog('fetchProductBrands:start:', category);

          if (category) {
            try {
              //category = category.split('-')[0];
              query = query.where(category, ">", 1).orderBy(category, 'desc');
            } catch (err) {}
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(query.limit(20).get());

        case 7:
          brandsQuerySnapshot = _context4.sent;
          brands = brandsQuerySnapshot.docs;
          availableBrandsDocs = brands.filter(function (doc) {
            return doc.id !== 'aggregate';
          });
          res = availableBrandsDocs.map(function (doc) {
            return Object.assign({
              'label': doc.id,
              'val': doc.id
            });
          });
          window.mlog('fetchProductBrands:res:', res);
          return _context4.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.error('fetchProductBrands', _context4.t0);

        case 18:
          return _context4.abrupt("return", new Promise(function (resolve) {
            return resolve([]);
          }));

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.fetchProductBrands = fetchProductBrands;

var fetchAvailableCategories = function fetchAvailableCategories() {
  var doc, res;
  return regeneratorRuntime.async(function fetchAvailableCategories$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(categoriesCollection.doc('aggregate').get());

        case 3:
          doc = _context5.sent;
          res = doc.data() || {};
          return _context5.abrupt("return", new Promise(function (resolve) {
            return resolve(Object.keys(res));
          }));

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);

        case 10:
          return _context5.abrupt("return", new Promise(function (resolve) {
            return resolve([]);
          }));

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.fetchAvailableCategories = fetchAvailableCategories;