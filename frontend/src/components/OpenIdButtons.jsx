import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

function OpenIdButtons() {
    const google = () => {
        window.open(
            'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle&client_id=138008803906-1vn3ceqk6959ig38j3itcnu6ut50jk4r.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email',
            '_self'
        );
    };

    const github = () => {
        window.open('http://localhost:5000/api/auth/github', '_self');
    };

    const facebook = () => {
        window.open(
            'https://www.facebook.com/v15.0/dialog/oauth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffacebook&client_id=3363396343883714&access_type=offline&response_type=code&prompt=consent&scope=public_profile+email',
            '_self'
        );
    };

    return (
        <div className="flex flex-col items-center w-full py-4">
            <button
                className="flex items-center justify-center rounded-sm bg-white text-gray-900 text-sm w-full mb-3 py-2"
                onClick={google}
            >
                <FaGoogle className="mr-1.5" />
                Log in with Google
            </button>
            <button
                className="flex items-center justify-center rounded-sm bg-gray-900 text-white text-sm w-full mb-3 py-2"
                onClick={github}
            >
                <FaGithub className="mr-1.5" />
                Log in with Github
            </button>
            <button
                className="flex items-center justify-center rounded-sm bg-blue-800 text-white text-sm w-full mb-3 py-2"
                onClick={facebook}
            >
                <FaFacebook className="mr-1.5" />
                Log in with Facebook
            </button>
        </div>
    );
}

export default OpenIdButtons;
