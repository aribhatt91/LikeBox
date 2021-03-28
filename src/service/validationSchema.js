import * as Yup from 'yup';

const EMAIL = Yup.string().email().label('Email'),
DATE = Yup.number().positive().integer().label('Date').min(1).max(31),
MONTH = Yup.number().positive().integer().label('Month').min(1).max(12),
YEAR = Yup.number().positive().integer().label('Year').min(1921).max(2020),
PASSWORD = Yup.string().min(6).label('Password'),
HOUSENUMBER = Yup.string().label("House number"),
STREET = Yup.string().label('Street'),
CITY = Yup.string().label('City/Town'),
POSTCODE = Yup.string().min(6).max(7).label('postcode'),
NAME = Yup.string().min(2),
GENDER = Yup.string(),
MOBILE = Yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid mobile number", excludeEmptyString: false}),
CONFIRMPASSWORD = Yup.string().min(6).label('Confirm password').when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "The passwords don't match"
    )
});

export const ADDRESS_SCHEMA = Yup.object().shape({
    name: NAME.required(),
    postcode: POSTCODE.required(),
    housenum: HOUSENUMBER.required(),
    city: CITY.required(),
    street: STREET.required()
})

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
    /* housenumber: HOUSENUMBER.required(),
    street: STREET.required(),
    city: CITY.required(),
    zipcode: ZIPCODE.required(), */
    fname: NAME.required().label('First name'),
    lname: NAME.required().label('Last name')/* ,
    mobile: MOBILE.required().label('Mobile number') */
});

/* ProfileUpdateForm */

export const PERSONAL_INFORMATION_SCHEMA = {
    fname: NAME,
    lname: NAME,
    gender: GENDER
}

export const CONTACT_INFORMATION_SCHEMA = {
    mobile: MOBILE,
    email: EMAIL
}