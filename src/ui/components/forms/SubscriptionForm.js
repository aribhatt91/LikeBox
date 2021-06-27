import React from 'react'
import AppSubmitButton from '../generic/AppSubmitButton'
import AppTextInput from '../generic/AppTextInput'
import AppForm from './AppForm'
import { EMAIL_FORM_SCHEMA } from './../../../service/validationSchema';

export default function SubscriptionForm({subscribe}) {
    return (
        <React.Fragment>
            <AppForm
                initialValues={{email: ''}}
                validationSchema={EMAIL_FORM_SCHEMA}
                onSubmit={subscribe}>
                <div className="d-flex flex-wrap flex-md-nowrap">
                    <AppTextInput
                        name="email"
                        label="Enter your email address"
                        type="email"
                        className=" " />
                    <AppSubmitButton
                        text="Get started"
                        className="border-radius-0" />
                </div>
            </AppForm>
        </React.Fragment>
    )
}
