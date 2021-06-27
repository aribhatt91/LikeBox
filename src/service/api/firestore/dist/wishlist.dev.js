"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromWishList = exports.addToWishList = exports.createWishList = exports.getUserWishList = exports.isItemInWishList = exports.updateWishlistQuery = exports.getWishlistQuery = void 0;

var _firebase = require("../firebase.js");

/* 
Wishlist Schema
{
    id,
    name,
    user_id,
    items: [
        {
            id,
            date_added
        }
    ]
} 
*/
var collection = _firebase.db.collection('wishlists');

var getWishlistQuery = function getWishlistQuery(email) {
  return collection.where("user_id", "==", email).get();
};

exports.getWishlistQuery = getWishlistQuery;

var updateWishlistQuery = function updateWishlistQuery(docId, update) {
  return collection.doc(docId).update(update);
};

exports.updateWishlistQuery = updateWishlistQuery;

var isItemInWishList = function isItemInWishList(email, sku) {
  var queries, isPresent;
  return regeneratorRuntime.async(function isItemInWishList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getWishlistQuery(email));

        case 3:
          queries = _context.sent;

          if (!(queries.size > 0)) {
            _context.next = 8;
            break;
          }

          isPresent = false;
          queries.forEach(function (doc) {
            window.mlog('WishList -> ', doc.id, doc.data());
            var data = doc.data();
            data = data || {};
            (data.items || []).forEach(function (item) {
              if (item.sku === sku) {
                isPresent = true;
              }
            });
          });
          return _context.abrupt("return", new Promise(function (resolve) {
            return resolve(isPresent);
          }));

        case 8:
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
          return _context.abrupt("return", new Promise(function (resolve) {
            return resolve(false);
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.isItemInWishList = isItemInWishList;

var getUserWishList = function getUserWishList(email) {
  var res, queries, items;
  return regeneratorRuntime.async(function getUserWishList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = [];
          _context2.prev = 1;

          if (!email) {
            _context2.next = 10;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(getWishlistQuery(email));

        case 5:
          queries = _context2.sent;
          items = [];

          if (queries.size > 0) {
            queries.forEach(function (doc) {
              window.mlog('WishList -> ', doc.id, doc.data());
              var data = doc.data();
              data = data || {};
              items = items.concat(data.items || []);
            });
            res = new Promise(function (resolve) {
              return resolve(items);
            });
          }

          _context2.next = 11;
          break;

        case 10:
          throw new Error('No email parameter found');

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          res = new Promise(function (resolve, reject) {
            return reject(_context2.t0);
          });

        case 16:
          return _context2.abrupt("return", res);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.getUserWishList = getUserWishList;

var createWishList = function createWishList(email) {
  var name,
      products,
      res,
      queries,
      wlist,
      items,
      docRef,
      doc,
      data,
      _args3 = arguments;
  return regeneratorRuntime.async(function createWishList$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          name = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : "My Wishlist";
          products = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : [];
          res = null;
          _context3.prev = 3;

          if (!email) {
            _context3.next = 37;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(getWishlistQuery(email));

        case 7:
          queries = _context3.sent;

          if (!(queries.size <= 0)) {
            _context3.next = 31;
            break;
          }

          wlist = {}, items = [];
          wlist.user_id = email;
          products.forEach(function (product) {
            if (!product.sku) {
              throw new Error('Invalid product');
            }

            items.push({
              sku: product.sku,
              thumbnail: product.thumbnail,
              name: product.name,
              link: product.link,
              price: product.price,
              currency: product.currency,
              date_added: new Date().getTime()
            });
          });
          wlist.items = items;
          _context3.prev = 13;
          _context3.next = 16;
          return regeneratorRuntime.awrap(collection.add(wlist));

        case 16:
          docRef = _context3.sent;
          _context3.next = 19;
          return regeneratorRuntime.awrap(collection.doc(docRef.id).get());

        case 19:
          doc = _context3.sent;
          doc = doc || {};
          window.mlog('createWishList', docRef.id, doc.data());
          res = new Promise(function (resolve) {
            return resolve({
              type: 'success',
              items: doc.data().items || []
            });
          }); //(data.items || []).map(item => item.sku)

          _context3.next = 29;
          break;

        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](13);
          console.error(_context3.t0);
          res = new Promise(function (resolve) {
            return resolve([]);
          });

        case 29:
          _context3.next = 35;
          break;

        case 31:
          data = {};
          data.type = 'error';
          data.msg = 'Wishlist is already present';
          res = new Promise(function (resolve) {
            return resolve(data);
          });

        case 35:
          _context3.next = 38;
          break;

        case 37:
          throw new Error('No email parameter present');

        case 38:
          _context3.next = 43;
          break;

        case 40:
          _context3.prev = 40;
          _context3.t1 = _context3["catch"](3);
          res = new Promise(function (resolve, reject) {
            return reject(_context3.t1);
          });

        case 43:
          return _context3.abrupt("return", res);

        case 44:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 40], [13, 25]]);
};

exports.createWishList = createWishList;

var addToWishList = function addToWishList(email, sku, product) {
  var res, queries, data, doc, docId, products, isPresent, i, _data, docRef;

  return regeneratorRuntime.async(function addToWishList$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = null;
          window.mlog('addToWishList called', product);

          if (!email) {
            _context4.next = 47;
            break;
          }

          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(getWishlistQuery(email));

        case 6:
          queries = _context4.sent;

          if (!(queries.size <= 0)) {
            _context4.next = 15;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(createWishList(email, "", [product]));

        case 10:
          data = _context4.sent;
          window.mlog('addToWishList: createWishList', data);
          res = new Promise(function (resolve) {
            return resolve(data);
          });
          _context4.next = 41;
          break;

        case 15:
          if (!(queries.size === 1)) {
            _context4.next = 41;
            break;
          }

          window.mlog('queries', queries.docs[0].id);
          doc = queries.docs[0], docId = doc.id;
          window.mlog(doc.id, " => ", doc.data());
          products = doc.data().items || [], isPresent = false;
          /* Check if product is present */

          i = 0;

        case 21:
          if (!(i < products.length)) {
            _context4.next = 28;
            break;
          }

          if (!(products[i].sku === product.sku)) {
            _context4.next = 25;
            break;
          }

          isPresent = true;
          return _context4.abrupt("break", 28);

        case 25:
          i++;
          _context4.next = 21;
          break;

        case 28:
          if (!isPresent) {
            _context4.next = 36;
            break;
          }

          _data = {};
          _data.type = 'error';
          _data.msg = 'Product is already present in your wish list';
          window.mlog('Product already present');
          res = new Promise(function (resolve, reject) {
            return reject(_data);
          });
          _context4.next = 41;
          break;

        case 36:
          /* If not add it and update */
          products.push({
            sku: product.sku,
            thumbnail: product.thumbnail,
            name: product.name,
            link: product.link,
            price: product.price,
            currency: product.currency,
            date_added: new Date().getTime()
          }); //let updateQuery = await updateWishlistQuery(doc.id, {'items': products});

          _context4.next = 39;
          return regeneratorRuntime.awrap(updateWishlistQuery(doc.id, {
            'items': products
          }));

        case 39:
          docRef = _context4.sent;

          /* doc = await collection.doc(docId).get();
          doc = doc || {}; */
          //window.mlog('addToWishList', docId, doc.data());
          res = new Promise(function (resolve) {
            return resolve({
              type: 'success',
              msg: 'Item added to your wishlist!'
            });
          });

        case 41:
          _context4.next = 46;
          break;

        case 43:
          _context4.prev = 43;
          _context4.t0 = _context4["catch"](3);

          /* let data = {};
          data.type = 'error';
          data.msg = 'Product is already present in your wish list'; */
          //console.error(err);
          res = new Promise(function (resolve, reject) {
            return reject({
              type: 'error',
              msg: 'An error occurred!',
              error: _context4.t0
            });
          });

        case 46:
          return _context4.abrupt("return", res);

        case 47:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 43]]);
};

exports.addToWishList = addToWishList;

var removeFromWishList = function removeFromWishList(email, sku) {
  var res, queries, doc, docId, products, isPresent, index, i, docRef, data, _data2;

  return regeneratorRuntime.async(function removeFromWishList$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res = null;

          if (!email) {
            _context5.next = 45;
            break;
          }

          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(getWishlistQuery(email));

        case 5:
          queries = _context5.sent;

          if (!(queries.size <= 0)) {
            _context5.next = 10;
            break;
          }

          res = createWishList(email, "", [sku]);
          _context5.next = 36;
          break;

        case 10:
          if (!(queries.size === 1)) {
            _context5.next = 36;
            break;
          }

          window.mlog('queries', queries.docs[0].id);
          doc = queries.docs[0], docId = doc.id;
          window.mlog(doc.id, " => ", doc.data());
          products = doc.data().items || [], isPresent = false, index = -1;
          /* Check if product is present */

          i = 0;

        case 16:
          if (!(i < products.length)) {
            _context5.next = 24;
            break;
          }

          if (!(products[i].sku === sku)) {
            _context5.next = 21;
            break;
          }

          isPresent = true;
          index = i;
          return _context5.abrupt("break", 24);

        case 21:
          i++;
          _context5.next = 16;
          break;

        case 24:
          if (!(isPresent && index > -1)) {
            _context5.next = 32;
            break;
          }

          products.splice(index, 1);
          _context5.next = 28;
          return regeneratorRuntime.awrap(updateWishlistQuery(doc.id, {
            'items': products
          }));

        case 28:
          docRef = _context5.sent;

          /* doc = await collection.doc(docId).get();
          doc = doc || {}; */
          //window.mlog('removeFromWishList', docId, doc.data());
          res = new Promise(function (resolve) {
            return resolve({
              type: 'success',
              msg: 'Item removed from your Wishlist!'
            });
          });
          _context5.next = 36;
          break;

        case 32:
          /* If not add it and update */
          data = {};
          data.type = 'error';
          data.msg = 'Item is not present in your wish list';
          res = new Promise(function (resolve, reject) {
            return reject(data);
          });

        case 36:
          _context5.next = 44;
          break;

        case 38:
          _context5.prev = 38;
          _context5.t0 = _context5["catch"](2);

          /* let data = {};
          data.type = 'error';
          data.msg = 'Product is already present in your wish list'; */
          _data2 = {};
          _data2.type = 'error';
          _data2.msg = 'An error occurred!';
          res = new Promise(function (resolve, reject) {
            return reject(_data2);
          });

        case 44:
          return _context5.abrupt("return", res);

        case 45:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 38]]);
};

exports.removeFromWishList = removeFromWishList;