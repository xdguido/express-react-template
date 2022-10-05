import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const { VITE_GOOGLE_CLIENT_ID, VITE_GITHUB_CLIENT_ID, VITE_FACEBOOK_CLIENT_ID, MODE, HOST } =
    import.meta.env;
const redirectURI = (service) => {
    return MODE === 'production' ? `${HOST}/${service}` : `http://localhost:3000/${service}`;
};

function OpenIdButtons() {
    const google = () => {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: redirectURI('google'),
            client_id: VITE_GOOGLE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ].join(' ')
        };
        const usp = new URLSearchParams(options);

        window.location.href = `${rootUrl}?${usp.toString()}`;
    };

    const github = () => {
        const rootUrl = 'https://github.com/login/oauth/authorize';
        const options = {
            redirect_uri: redirectURI('github'),
            client_id: VITE_GITHUB_CLIENT_ID,
            scope: 'user'
        };
        const usp = new URLSearchParams(options);

        window.location.href = `${rootUrl}?${usp.toString()}`;
    };

    const facebook = () => {
        const rootUrl = 'https://www.facebook.com/v15.0/dialog/oauth';
        const options = {
            redirect_uri: redirectURI('facebook'),
            client_id: VITE_FACEBOOK_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: ['public_profile', 'email'].join(' ')
        };
        const usp = new URLSearchParams(options);

        window.location.href = `${rootUrl}?${usp.toString()}`;
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
                Log in with Github
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
