import React from 'react';
import { Formik } from 'formik';

function AppForm({initialValues, onSubmit, validationSchema, children}) {
    
    return (
        <Formik
          initialValues={initialValues}
          onSubmit= {onSubmit}
          validationSchema={validationSchema}
        >

        {
          ({handleChange, handleSubmit, setFieldError, setFieldTouched, errors, touched}) => (
            <React.Fragment>
                {
                    children
                }
            </React.Fragment>
          )
        }

        </Formik>
    );
}

export default AppForm;