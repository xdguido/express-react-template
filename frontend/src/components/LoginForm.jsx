import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const dispatch = useDispatch();
    const from = location.state?.from?.pathname || '/';
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const [remind, setRemind] = useState(true);

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
        if (isSuccess) {
            navigate(from, { replace: true });
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    useEffect(() => {
        localStorage.setItem('remind', remind);
    }, [remind]);

    const onSubmit = (data) => {
        const userData = { ...data, remind };
        dispatch(loginUser(userData));
    };

    const onChange = () => {
        setRemind((prev) => !prev);
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
            <label className="mb-3 text-sm" htmlFor="remind">
                <input
                    className="mr-2"
                    id="remind"
                    type="checkbox"
                    checked={remind}
                    onChange={onChange}
                />
                Keep me logged in
            </label>
            <SubmitButton isLoading={isLoading} label="Log in" />
        </form>
    );
}

export default LoginForm;
