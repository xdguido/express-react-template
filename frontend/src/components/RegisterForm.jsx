import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

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
        <div className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Display name"
                        required
                    ></input>
                </div>
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
                    <input
                        type="password"
                        id="password2"
                        value={password2}
                        onChange={onChange}
                        placeholder="Confirm password"
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
