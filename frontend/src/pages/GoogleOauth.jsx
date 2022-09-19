import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginGoogle, reset } from '../features/auth/authSlice';

function GoogleOauth() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, isSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loginGoogle(code));
    }, []);

    useEffect(() => {
        if (isError) {
            navigate('/error');
        }
        if (isSuccess) {
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess]);

    return (
        <>
            <h1>Login Google</h1>
        </>
    );
}

export default GoogleOauth;
