import OpenIdButtons from '../../components/OpenIdButtons';
import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="flex flex-auto items-center justify-center p-4">
            <div className="flex flex-col items-center w-80">
                <Logo />
                <OpenIdButtons />
                <LoginForm />
                <span className="text-sm mt-6">
                    {'Forgot your password?'}
                    <Link className="text-blue-600 ml-1" to="/register">
                        Recover it
                    </Link>
                </span>
                <span className="text-sm mt-1">
                    {"Don't have an account?"}
                    <Link className="text-blue-600 ml-1" to="/register">
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
