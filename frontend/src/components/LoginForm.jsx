import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, reset } from '../features/auth/authSlice';
import { validateEmail, validatePassword } from '../validators/userValidator';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const inputs = [
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
        }
    ];

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (user || isSuccess) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (data) => {
        dispatch(loginUser(data));
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
            <SubmitButton isLoading={isLoading} label="Log in" />
        </form>
    );
}

export default LoginForm;
