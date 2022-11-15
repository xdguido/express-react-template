import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { loginGoogle, loginFacebook, loginGithub, reset } from '../../features/auth/authSlice';

function OAuthHandler() {
    const { provider } = useParams();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const remind = localStorage.getItem('remind');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, user } = useSelector((state) => state.auth);
    const data = { code, remind };

    useEffect(() => {
        switch (provider) {
            case 'google':
                dispatch(loginGoogle(data));
                break;
            case 'github':
                dispatch(loginGithub(data));
                break;
            case 'facebook':
                dispatch(loginFacebook(data));
                break;
        }
    }, []);

    useEffect(() => {
        if (!code || !provider || isError) {
            navigate('/error', { replace: true });
        }
        if (user) {
            navigate('/', { replace: true });
        }
        dispatch(reset());
    }, [isError, user, code, provider]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex items-center rounded-md shadow-md bg-white p-4">Loading...</div>
        </div>
    );
}

export default OAuthHandler;
