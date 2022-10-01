import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import SubmitButton from './SubmitButton';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            navigate('/login');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password
            };
            dispatch(register(userData));
        }
    };

    return (
        <form
            className="flex flex-col rounded-md shadow-md text-gray-900 bg-white p-4"
            onSubmit={onSubmit}
        >
            <div className="mb-2">
                <label className="" htmlFor="name">
                    Display name
                </label>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    type="text"
                    id="name"
                    value={name}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <div className="mb-2">
                <label className="" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    type="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <div className="mb-2">
                <label className="" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <div className="mb-2">
                <label className="" htmlFor="password2">
                    Confirm password
                </label>
                <input
                    className="rounded-sm border-gray-300 h-9 w-full"
                    type="password"
                    id="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder=""
                    required
                ></input>
            </div>
            <SubmitButton isLoading={isLoading} label="Sign up" />
        </form>
    );
}

export default RegisterForm;
