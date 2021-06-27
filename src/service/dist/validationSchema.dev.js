"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTACT_INFORMATION_SCHEMA = exports.PERSONAL_INFORMATION_SCHEMA = exports.SIGNUP_FORM_SCHEMA = exports.EMAIL_FORM_SCHEMA = exports.LOGIN_FORM_SCHEMA = exports.ADDRESS_SCHEMA = void 0;

var Yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EMAIL = Yup.string().email().label('Email'),
    DAY = Yup.number().positive().integer().label('Date').min(1).max(31),
    MONTH = Yup.number().positive().integer().label('Month').min(1).max(12),
    YEAR = Yup.number().positive().integer().label('Year').min(1921).max(2020),
    PASSWORD = Yup.string().min(6).label('Password'),
    HOUSENUMBER = Yup.string().label("House number"),
    STREET = Yup.string().label('Street'),
    CITY = Yup.string().label('City/Town'),
    POSTCODE = Yup.string().min(6).max(7).label('postcode'),
    NAME = Yup.string().min(1),
    GENDER = Yup.string().label('Gender'),
    MOBILE = Yup.string().matches(/^[6-9]\d{9}$/, {
  message: "Please enter valid mobile number",
  excludeEmptyString: false
}),
    CONFIRMPASSWORD = Yup.string().min(6).label('Confirm password').when("password", {
  is: function is(val) {
    return val && val.length > 0 ? true : false;
  },
  then: Yup.string().oneOf([Yup.ref("password")], "The passwords don't match")
});
var ADDRESS_SCHEMA = Yup.object().shape({
  name: NAME.required(),
  postcode: POSTCODE.required(),
  housenum: HOUSENUMBER.required(),
  city: CITY.required(),
  street: STREET.required()
});
exports.ADDRESS_SCHEMA = ADDRESS_SCHEMA;
var LOGIN_FORM_SCHEMA = Yup.object().shape({
  email: EMAIL.required(),
  password: PASSWORD.required()
});
exports.LOGIN_FORM_SCHEMA = LOGIN_FORM_SCHEMA;
var EMAIL_FORM_SCHEMA = Yup.object().shape({
  email: EMAIL.required()
});
exports.EMAIL_FORM_SCHEMA = EMAIL_FORM_SCHEMA;
var SIGNUP_FORM_SCHEMA = Yup.object().shape({
  email: EMAIL.required(),
  password: PASSWORD.required(),
  confirmpassword: CONFIRMPASSWORD.required(),
  day: DAY.required(),
  month: MONTH.required(),
  year: YEAR.required(),
  gender: GENDER.required(),

  /* housenumber: HOUSENUMBER.required(),
  street: STREET.required(),
  city: CITY.required(),
  zipcode: ZIPCODE.required(), */
  fname: NAME.required().label('First name'),
  lname: NAME.required().label('Last name')
  /* ,
  mobile: MOBILE.required().label('Mobile number') */

});
/* ProfileUpdateForm */

exports.SIGNUP_FORM_SCHEMA = SIGNUP_FORM_SCHEMA;
var PERSONAL_INFORMATION_SCHEMA = Yup.object().shape({
  fname: NAME,
  lname: NAME,
  gender: GENDER,
  day: DAY.when(['month', 'year'], {
    is: function is(month, year) {
      return [1, 3, 5, 7, 8, 10, 12].indexOf(month) === -1;
    },
    then: DAY.max(30)
  }),
  month: MONTH,
  year: YEAR
});
exports.PERSONAL_INFORMATION_SCHEMA = PERSONAL_INFORMATION_SCHEMA;
var CONTACT_INFORMATION_SCHEMA = Yup.object().shape({
  mobile: MOBILE,
  email: EMAIL
});
exports.CONTACT_INFORMATION_SCHEMA = CONTACT_INFORMATION_SCHEMA;