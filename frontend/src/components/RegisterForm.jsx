import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import { validateEmail, validatePassword, validateName } from '../validators/userValidator';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    });
    const password = useRef({});
    password.current = watch('password');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const inputs = [
        {
            name: 'name',
            type: 'text',
            placeholder: '',
            label: 'Display name',
            options: {
                validate: validateName,
                required: 'This is required'
            }
        },
        {
            name: 'email',
            type: 'email',
            placeholder: '',
            label: 'Email',
            options: {
                validate: validateEmail,
                required: 'This is required'
            }
        },
        {
            name: 'password',
            type: 'password',
            placeholder: '',
            label: 'Password',
            options: {
                validate: validatePassword,
                required: 'This is required'
            }
        },
        {
            name: 'password2',
            type: 'password',
            placeholder: '',
            label: 'Confirm password',
            options: {
                validate: (v) => v === password.current || "Passwords don't match",
                required: 'This is required'
            }
        }
    ];

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <form
            className="flex flex-col rounded-md shadow-md text-gray-900 bg-white p-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {inputs.map((input) => (
                <FormInput
                    {...register(input.name, input.options)}
                    {...input}
                    key={input.name}
                    id={input.name}
                    errors={errors[input.name]}
                />
            ))}
            <SubmitButton isLoading={isLoading} label="Sign up" />
        </form>
    );
}

export default RegisterForm;
