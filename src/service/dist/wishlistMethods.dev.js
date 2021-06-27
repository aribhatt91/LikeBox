"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWishList = exports.removeItemFromWishList = exports.addItemToWishList = exports.itemInWishList = void 0;

var _wishlist = require("./api/firestore/wishlist");

var _productMethods = require("./productMethods");

var itemInWishList = function itemInWishList(email, sku) {
  return (0, _wishlist.isItemInWishList)(email, sku);
};

exports.itemInWishList = itemInWishList;

var addItemToWishList = function addItemToWishList(email, sku, product) {
  return regeneratorRuntime.async(function addItemToWishList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _wishlist.addToWishList)(email, sku, product));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addItemToWishList = addItemToWishList;

var removeItemFromWishList = function removeItemFromWishList(email, sku) {
  return regeneratorRuntime.async(function removeItemFromWishList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _wishlist.removeFromWishList)(email, sku));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.removeItemFromWishList = removeItemFromWishList;

var fetchWishList = function fetchWishList(email) {
  return regeneratorRuntime.async(function fetchWishList$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _wishlist.getUserWishList)(email));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.fetchWishList = fetchWishList;