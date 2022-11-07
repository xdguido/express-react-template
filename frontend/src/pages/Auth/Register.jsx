import { useSelector } from 'react-redux';
import OpenIdButtons from '../../components/OpenIdButtons';
import RegisterForm from '../../components/RegisterForm';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';

function Register() {
    const { isSuccess } = useSelector((state) => state.auth);
    return (
        <div className="flex flex-auto items-center justify-center p-4">
            {isSuccess ? (
                <div className="flex flex-col items-center rounded-md shadow-md bg-white max-w-md p-4">
                    <Logo />
                    <h1 className="font-semibold mt-2">
                        Check your email and verify your account.
                    </h1>
                    <p>{"If you don't see the email check the spam inbox."}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center w-80">
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
            )}
        </div>
    );
}

export default Register;
