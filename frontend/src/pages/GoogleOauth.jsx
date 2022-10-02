import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginGoogle, reset } from '../features/auth/authSlice';
import { FaGoogle } from 'react-icons/fa';

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
        <div className="flex items-center justify-center p-4">
            <div className="flex items-center rounded-md shadow-md bg-white p-4">
                <FaGoogle className="text-2xl" />

                <div className="flex items-center justify-center animate-pulse space-x-2 px-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>

                <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />
                <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />
            </div>
        </div>
    );
}

export default GoogleOauth;
