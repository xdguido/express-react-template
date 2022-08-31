import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

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
        if (isSuccess || user) {
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
        <div className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter password"
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
