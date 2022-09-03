import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword, reset } from '../features/auth/authSlice';

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
        <>
            <h1>Reset password {token}</h1>
            <form onSubmit={onSubmit}>
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
        </>
    );
}

export default Recovery;
