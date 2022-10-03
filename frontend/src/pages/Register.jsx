import OpenIdButtons from '../components/OpenIdButtons';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="flex flex-auto items-center justify-center p-4">
            <div className="flex flex-col items-center max-w-xs">
                <Logo />
                <OpenIdButtons />
                <RegisterForm />
                <div className="text-sm mt-8">
                    {'Already have an account?'}
                    <Link className="text-blue-600 ml-1" to="/login">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
