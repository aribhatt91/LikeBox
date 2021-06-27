"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fieldPath = exports.db = exports.auth = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

require("firebase/firestore");

var _firebaseDev = _interopRequireDefault(require("../keys/firebase-dev-1.json"));

var _firebaseDev2 = _interopRequireDefault(require("../keys/firebase-dev-2.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _app["default"].initializeApp(_firebaseDev["default"]);

var auth = app.auth();
exports.auth = auth;

var db = _app["default"].firestore();

exports.db = db;
var fieldPath = _app["default"].firestore.FieldPath;
exports.fieldPath = fieldPath;
var _default = app;
exports["default"] = _default;