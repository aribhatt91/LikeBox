"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserChoice = exports.updateUserStyle = exports.getUserStyle = exports.setUserSizing = exports.getUserLikeBox = exports.getUserSizing = exports.updateUserByEmail = exports.addUser = exports.isFirstLoad = exports.getUser = exports.fetchUserQuery = void 0;

var _firebase = require("./../firebase");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* let user = {
    email,
    name: {
        fname,
        lname
    },
    mobile,
    addresses: [{
        housenum,
        street,
        city,
        zipcode,
        country
    }],
    cart : {
        items:[],
        total,
        date,
        size
    },
    wishlist,
    orders,
    payments,
    sizing: {
        shoesize,
        neck,
        chest,
        height,
        waist
    }
} */
var collection = _firebase.db.collection('users');

function stringToHash(string) {
  var hash = 0;
  if (string.length == 0) return hash;

  for (var i = 0; i < string.length; i++) {
    var _char = string.charCodeAt(i);

    hash = (hash << 5) - hash + _char;
    hash = hash & hash;
  }

  return hash;
}

var fetchUserQuery = function fetchUserQuery(email) {
  return collection.where("email", "==", email).get();
};

exports.fetchUserQuery = fetchUserQuery;

var getUser = function getUser(email) {
  var user, queries;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = null;
          window.mlog('getUser:start', new Date().getTime());
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetchUserQuery(email));

        case 5:
          queries = _context.sent;

          if (!(queries.docs.length > 0)) {
            _context.next = 11;
            break;
          }

          user = queries.docs[0].data();
          window.mlog('getUser:try', user, new Date().getTime());
          _context.next = 12;
          break;

        case 11:
          throw new Error('Unique user not found');

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          console.error('user:getUser:', _context.t0);
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context.t0);
          }));

        case 18:
          _context.prev = 18;
          window.mlog('getUser:finally', user, new Date().getTime());
          return _context.finish(18);

        case 21:
          return _context.abrupt("return", new Promise(function (resolve) {
            return resolve(user);
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14, 18, 21]]);
};

exports.getUser = getUser;

var isFirstLoad = function isFirstLoad(email) {
  var user, res;
  return regeneratorRuntime.async(function isFirstLoad$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = null, res = true;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getUser(email));

        case 4:
          user = _context2.sent;
          window.mlog('isFirstLoad', user);
          res = !(user && user.showedPrefs);
          window.mlog('isFirstLoad:first', res);

          if (res) {
            _context2.next = 16;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(updateUserByEmail(email, {
            showedPrefs: true
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(getUser(email));

        case 13:
          user = _context2.sent;
          res = !(user && user.showedPrefs);
          window.mlog('isFirstLoad:await', res);

        case 16:
          _context2.next = 20;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);

        case 20:
          window.mlog('isFirstLoad:return', res);
          return _context2.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 18]]);
};

exports.isFirstLoad = isFirstLoad;

var addUser = function addUser(newUser) {
  var user, date;
  return regeneratorRuntime.async(function addUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!newUser.email) {
            _context3.next = 13;
            break;
          }

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(getUser(newUser.email));

        case 4:
          user = _context3.sent;

          if (!user) {
            _context3.next = 8;
            break;
          }

          console.error('Email address is already registered');
          return _context3.abrupt("return");

        case 8:
          _context3.next = 12;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);

        case 12:
          try {
            date = new Date().getTime();
            newUser.date_joined = date;
            collection.add(newUser).then(function (docRef) {
              window.mlog("Document written with ID: ", docRef);
            })["catch"](function (error) {
              console.error("Error adding document: ", error);
            });
          } catch (err) {
            console.error("addUser: error -> ", err);
          }

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.addUser = addUser;

var validateUpdateObject = function validateUpdateObject(update) {
  return update && _typeof(update) === 'object' && (update.hasOwnProperty('name') || update.hasOwnProperty('cart') || update.hasOwnProperty('addresses') || update.hasOwnProperty('wishlist') || update.hasOwnProperty('orders') || update.hasOwnProperty('payments') || update.hasOwnProperty('sizing') || update.hasOwnProperty('mobile'));
};

var updateUserByEmail = function updateUserByEmail(email, update) {
  var res, querySnapshot, doc;
  return regeneratorRuntime.async(function updateUserByEmail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = null;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetchUserQuery(email));

        case 4:
          querySnapshot = _context4.sent;

          if (!(querySnapshot.docs.length === 1)) {
            _context4.next = 14;
            break;
          }

          doc = querySnapshot.docs[0]; // doc.data() is never undefined for query doc snapshots

          window.mlog(doc.id, " => ", doc.data());
          _context4.next = 10;
          return regeneratorRuntime.awrap(collection.doc(doc.id).update(update));

        case 10:
          res = _context4.sent;
          window.mlog('updateUserByEmail: response', res);
          _context4.next = 15;
          break;

        case 14:
          throw new Error('Update Aborted! More than one user found with same email');

        case 15:
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](1);
          console.error("updateUser:error:", _context4.t0);
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context4.t0);
          }));

        case 21:
          return _context4.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports.updateUserByEmail = updateUserByEmail;

var getUserSizing = function getUserSizing(email) {
  var sizing, user;
  return regeneratorRuntime.async(function getUserSizing$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sizing = null;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(getUser(email));

        case 4:
          user = _context5.sent;
          sizing = user.sizing;
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error("getUserSizing:error -> ", _context5.t0);

        case 11:
          return _context5.abrupt("return", new Promise(function (resolve) {
            return resolve(sizing);
          }));

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getUserSizing = getUserSizing;

var getUserLikeBox = function getUserLikeBox(email) {
  var likebox, user;
  return regeneratorRuntime.async(function getUserLikeBox$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          likebox = null;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(getUser(email));

        case 4:
          user = _context6.sent;
          likebox = user.likebox || null;
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          console.error("getUserLikeBox:error -> ", _context6.t0);

        case 11:
          return _context6.abrupt("return", new Promise(function (resolve) {
            return resolve(likebox);
          }));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getUserLikeBox = getUserLikeBox;

var setUserSizing = function setUserSizing(email, update) {
  var res, sizing;
  return regeneratorRuntime.async(function setUserSizing$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res = null;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(getUserSizing(email));

        case 4:
          sizing = _context7.sent;
          ;

          if (sizing) {
            sizing = _objectSpread({}, sizing, {}, update);
          } else {
            sizing = update;
          }

          _context7.next = 9;
          return regeneratorRuntime.awrap(updateUserByEmail(email, {
            sizing: sizing
          }));

        case 9:
          res = _context7.sent;
          //res = res.sizing;
          window.mlog('setUserSizing:updated sizing', res);
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](1);
          console.error("setUserSizing:error -> ", _context7.t0);

        case 16:
          return _context7.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 17:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.setUserSizing = setUserSizing;

var getUserStyle = function getUserStyle(email) {
  var styles, user;
  return regeneratorRuntime.async(function getUserStyle$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          styles = null;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(getUser(email));

        case 4:
          user = _context8.sent;
          styles = user.styles;
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          console.error("getUserStyle:error -> ", _context8.t0);

        case 11:
          return _context8.abrupt("return", new Promise(function (resolve) {
            return resolve(styles);
          }));

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getUserStyle = getUserStyle;

var updateUserStyle = function updateUserStyle(email, styles) {
  var res;
  return regeneratorRuntime.async(function updateUserStyle$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res = null;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(updateUserByEmail(email, {
            styles: styles
          }));

        case 4:
          res = _context9.sent;
          window.mlog('updateUserStyle:updated styles', res);
          _context9.next = 12;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          console.error("updateUserStyle:error -> ", _context9.t0);
          return _context9.abrupt("return", new Promise(function (resolve, reject) {
            return reject(_context9.t0);
          }));

        case 12:
          return _context9.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.updateUserStyle = updateUserStyle;

var getUserChoice = function getUserChoice(email) {
  var likebox, user;
  return regeneratorRuntime.async(function getUserChoice$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          likebox = null;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(getUser(email));

        case 4:
          user = _context10.sent;
          likebox = user.box || null;
          _context10.next = 11;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](1);
          console.error("getUserLikeBox:error -> ", _context10.t0);

        case 11:
          return _context10.abrupt("return", new Promise(function (resolve) {
            return resolve(likebox);
          }));

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getUserChoice = getUserChoice;