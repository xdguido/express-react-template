import React from 'react';
import PropTypes from 'prop-types';

const FormInput = React.forwardRef(function FormInput(props, ref) {
    const { label, id, errors, ...inputProps } = props;
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };

    return (
        <div className={classNames(errors ? 'mb-1' : 'mb-3', 'flex flex-col')}>
            <label className="mb-1" htmlFor={id}>
                {label}
            </label>
            <input
                className={classNames(
                    errors ? 'border-red-600' : 'border-gray-300',
                    'rounded-sm h-9'
                )}
                ref={ref}
                {...inputProps}
            />
            {errors && <span className="text-red-600 text-sm">{errors.message}</span>}
        </div>
    );
});

FormInput.propTypes = {
    errors: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string
};

export default FormInput;
