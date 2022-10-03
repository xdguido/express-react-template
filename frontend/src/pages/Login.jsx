import OpenIdButtons from '../components/OpenIdButtons';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="flex flex-auto items-center justify-center p-4">
            <div className="flex flex-col items-center max-w-xs">
                <Logo />
                <OpenIdButtons />
                <LoginForm />
                <div className="text-sm mt-8">
                    {"Don't have an account?"}
                    <Link className="text-blue-600 ml-1" to="/register">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
