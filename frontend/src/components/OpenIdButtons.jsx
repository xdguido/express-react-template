import axios from '../api/axios';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

function OpenIdButtons() {
    const google = async () => {
        const res = await axios.get('api/auth/google/url');
        window.location.href = res.data;
    };

    const github = async () => {
        const res = await axios.get('api/auth/github/url');
        window.location.href = res.data;
    };

    const facebook = async () => {
        const res = await axios.get('api/auth/facebook/url');
        window.location.href = res.data;
    };

    return (
        <div className="flex flex-col items-center w-full py-4">
            <button
                className="flex items-center justify-center rounded border bg-white text-gray-900 text-sm w-full mb-3 py-2"
                onClick={google}
            >
                <FaGoogle className="mr-1.5" />
                Log in with Google
            </button>
            <button
                className="flex items-center justify-center rounded bg-gray-900 text-white text-sm w-full mb-3 py-2"
                onClick={github}
            >
                <FaGithub className="mr-1.5" />
                Log in with GitHub
            </button>
            <button
                className="flex items-center justify-center rounded bg-blue-800 text-white text-sm w-full mb-3 py-2"
                onClick={facebook}
            >
                <FaFacebook className="mr-1.5" />
                Log in with Facebook
            </button>
        </div>
    );
}

export default OpenIdButtons;
