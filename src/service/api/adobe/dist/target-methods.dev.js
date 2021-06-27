"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductPageVisit = exports.sendProductInformation = exports.triggerCustomEvent = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var triggerCustomEvent = function triggerCustomEvent(viewName, params) {
  var mboxName = 'mbox-page-view',
      detail = {};

  if (viewName) {
    mboxName = 'mbox-' + viewName;
    detail = {
      view: viewName
    };
  }

  if (params && _typeof(params) === 'object') {
    detail = _objectSpread({}, detail, {
      params: params
    });
  }

  detail = _objectSpread({}, detail, {
    mbox: mboxName
  });
  var event = new CustomEvent("react-view-change", {
    detail: detail
  });
  document.dispatchEvent(event);
};

exports.triggerCustomEvent = triggerCustomEvent;

var sendProductInformation = function sendProductInformation(item) {};

exports.sendProductInformation = sendProductInformation;

var updateProductPageVisit = function updateProductPageVisit(item) {
  var mboxName = 'mbox-pdp-recs',
      detail = {
    productId: item.sku,
    productCategory: item.searchTerms
  };
};

exports.updateProductPageVisit = updateProductPageVisit;