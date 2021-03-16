import * as Yup from 'yup';

const EMAIL = Yup.string().email().label('Email'),
DATE = Yup.number().positive().integer().label('Date').min(1).max(31),
MONTH = Yup.number().positive().integer().label('Month').min(1).max(12),
YEAR = Yup.number().positive().integer().label('Year').min(1921).max(2020),
PASSWORD = Yup.string().min(6).label('Password'),
HOUSENUMBER = Yup.number().label("House humber"),
STREET = Yup.string().label('Street name'),
CITY = Yup.string().label('City'),
ZIPCODE = Yup.string().min(6).label('Zipcode'),
NAME = Yup.string().min(2),
MOBILE = Yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid mobile number", excludeEmptyString: false}),
CONFIRMPASSWORD = Yup.string().min(6).label('Confirm password').when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "The passwords don't match"
    )
});

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
    email: EMAIL.required(),
    password: PASSWORD.required()
})

export const EMAIL_FORM_SCHEMA = Yup.object().shape({
    email: EMAIL.required()
})

export const SIGNUP_FORM_SCHEMA = Yup.object().shape({
    email: EMAIL.required(),
    password: PASSWORD.required(),
    confirmpassword: CONFIRMPASSWORD.required(),
    date: DATE.required(),
    month: MONTH.required(),
    year: YEAR.required(),
    housenumber: HOUSENUMBER.required(),
    street: STREET.required(),
    city: CITY.required(),
    zipcode: ZIPCODE.required(),
    fname: NAME.required().label('First name'),
    lname: NAME.required().label('Last name'),
    mobile: MOBILE.required().label('Mobile number')
});