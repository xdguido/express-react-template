import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import SubmitButton from './SubmitButton';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (user || isSuccess) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };
        dispatch(login(userData));
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <form
            className="flex flex-col rounded-md shadow-md text-gray-900 bg-white p-5"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col mb-3">
                <label className="mb-1" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    disabled={isLoading}
                    type="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex items-center justify-between">
                    <label className="mb-1" htmlFor="password">
                        Password
                    </label>
                    <Link className="text-xs text-blue-600" to="/">
                        Forgot your password?
                    </Link>
                </div>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    disabled={isLoading}
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <SubmitButton isLoading={isLoading} label="Log in" />
        </form>
    );
}

export default LoginForm;
