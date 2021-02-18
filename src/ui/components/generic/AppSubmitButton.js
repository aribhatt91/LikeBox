import React from 'react';
import { useFormikContext } from 'formik';
import ThemedButton from './ThemedButton';
import AppButton from './AppButton';
function AppSubmitButton({text,...rest}) {
    const {handleSubmit, isSubmitting} = useFormikContext();
    return (
        <React.Fragment>
            <AppButton
                label={text}
                disabled={isSubmitting}
                className="border-radius-0"
                onClick={handleSubmit}
            />{/* 
            <ThemedButton
                {...rest}
                btnState={ isSubmitting ? "disabled" : "active"}
                text={text}
                theme={theme}
                size={size}
                _click={handleSubmit}
            /> */}
        </React.Fragment>
    );
}

export default AppSubmitButton;