import * as Yup from 'yup';

const EMAIL = Yup.string().email().label('Email'),
PASSWORD = Yup.string().min(6).label('Password'),
NAME = Yup.string().min(2),
MOBILE = Yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid mobile number", excludeEmptyString: false});

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
    fname: NAME.required().label('First name'),
    lname: NAME.required().label('Last name'),
    mobile: MOBILE.required().label('Mobile number')
});