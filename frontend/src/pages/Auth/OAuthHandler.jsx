import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { loginGoogle, loginFacebook, loginGithub, reset } from '../../features/auth/authSlice';
import Logo from '../../components/Logo';

function OAuthHandler() {
    const { provider } = useParams();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, isSuccess, persist } = useSelector((state) => state.auth);
    const data = { code, persist };

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
        if (isError) {
            navigate('/error', { replace: true });
        }
        if (isSuccess) {
            navigate('/', { replace: true });
        }
        dispatch(reset());
    }, [isError, isSuccess]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex items-center rounded-md shadow-md bg-white p-4">
                <Logo />
            </div>
        </div>
    );
}

export default OAuthHandler;
