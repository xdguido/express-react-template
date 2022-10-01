import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword, reset } from '../features/auth/authSlice';
import SubmitButton from './SubmitButton';

function Recovery() {
    const [formData, setFormData] = useState({
        password: '',
        password2: ''
    });
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { password, password2 } = formData;
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
                password,
                token
            };
            dispatch(resetPassword(userData));
        }
    };

    return (
        <form
            className="flex flex-col rounded-md shadow-md text-gray-900 bg-white p-4"
            onSubmit={onSubmit}
        >
            <div className="mb-2">
                <label className="" htmlFor="password">
                    New Password
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
            <SubmitButton isLoading={isLoading} label="Submit" />
        </form>
    );
}

export default Recovery;
