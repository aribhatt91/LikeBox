import React from 'react';
import { useFormikContext } from 'formik';
import ThemedButton from './ThemedButton';
function AppSubmitButton({btnText, theme, size, ...rest}) {
    const {handleSubmit, isSubmitting} = useFormikContext();
    return (
        <React.Fragment>
            <ThemedButton
                {...rest}
                btnState={ isSubmitting ? "disabled" : "active"}
                btnText={btnText}
                theme={theme}
                size={size}
                _click={handleSubmit}
            />
        </React.Fragment>
    );
}

export default AppSubmitButton;