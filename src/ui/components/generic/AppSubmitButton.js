import React from 'react';
import { useFormikContext } from 'formik';
import AppButton from './AppButton';
function AppSubmitButton({text,...rest}) {
    const {handleSubmit, isSubmitting} = useFormikContext();
    return (
        <React.Fragment>
            <AppButton
                label={text}
                disabled={isSubmitting}
                onClick={handleSubmit}
                loading={isSubmitting}
                type="submit"
                {...rest}
            />
        </React.Fragment>
    );
}

export default AppSubmitButton;