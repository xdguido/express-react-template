import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginGithub, reset } from '../features/auth/authSlice';
import { FaGithub } from 'react-icons/fa';
import Logo from '../components/Logo';

function GithubOAuth() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, isSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loginGithub(code));
    }, []);

    useEffect(() => {
        if (isError) {
            navigate('/error');
        }
        if (isSuccess) {
            navigate('/', { replace: true });
        }
        dispatch(reset());
    }, [isError, isSuccess]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex items-center rounded-md shadow-md bg-white p-4">
                <FaGithub className="text-2xl" />

                <div className="flex items-center justify-center animate-pulse space-x-2 px-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>

                <Logo />
            </div>
        </div>
    );
}

export default GithubOAuth;
