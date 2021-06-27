"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserStylePref = exports.updateUserStylePref = exports.getUserSizes = exports.setUserSizes = exports.isFirstSession = exports.updateUserProfile = exports.fetchUserProfile = exports.updateLikeBox = exports.fetchLikeBox = exports.addUserProfile = void 0;

var _user = require("./api/firestore/user");

var addUserProfile = function addUserProfile(user) {
  return (0, _user.addUser)(user);
};

exports.addUserProfile = addUserProfile;

var fetchLikeBox = function fetchLikeBox(email) {
  return (0, _user.getUserLikeBox)(email);
};

exports.fetchLikeBox = fetchLikeBox;

var updateLikeBox = function updateLikeBox(email, likebox) {
  return (0, _user.updateUserByEmail)(email, likebox);
};

exports.updateLikeBox = updateLikeBox;

var fetchUserProfile = function fetchUserProfile(email) {
  var res;
  return regeneratorRuntime.async(function fetchUserProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _user.getUser)(email));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", new Promise(function (resolve) {
            return resolve(res);
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.fetchUserProfile = fetchUserProfile;

var updateUserProfile = function updateUserProfile(email, update) {
  return (0, _user.updateUserByEmail)(email, update);
};

exports.updateUserProfile = updateUserProfile;

var isFirstSession = function isFirstSession(email) {
  var firstSession, _firstSession;

  return regeneratorRuntime.async(function isFirstSession$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          firstSession = localStorage.getItem('firstSession') !== 'false';

          if (!firstSession) {
            _context2.next = 6;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _user.isFirstLoad)(email));

        case 4:
          _firstSession = _context2.sent;
          localStorage.setItem('firstSession', _firstSession);

        case 6:
          window.mlog('isFirstSession', firstSession);
          return _context2.abrupt("return", new Promise(function (resolve) {
            return resolve(firstSession);
          }));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.isFirstSession = isFirstSession;

var setUserSizes = function setUserSizes(email, sizes) {
  return (0, _user.setUserSizing)(email, sizes);
};

exports.setUserSizes = setUserSizes;

var getUserSizes = function getUserSizes(email) {
  return (0, _user.getUserSizing)(email);
};

exports.getUserSizes = getUserSizes;

var updateUserStylePref = function updateUserStylePref(email, sizes) {
  return (0, _user.updateUserStyle)(email, sizes);
};

exports.updateUserStylePref = updateUserStylePref;

var getUserStylePref = function getUserStylePref(email) {
  return (0, _user.getUserStyle)(email);
};
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


exports.getUserStylePref = getUserStylePref;