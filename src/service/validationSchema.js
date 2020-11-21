import * as Yup from 'yup';

const EMAIL = Yup.string().email().label('Email'),
PASSWORD = Yup.string().min(6).label('Password'),
NAME = Yup.string().min(2).label('Name');

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
    email: EMAIL.required(),
    password: PASSWORD.required()
})

