import { FaGoogle, FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

function Socials() {
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
        window.open('http://localhost:5000/api/auth/facebook', '_self');
    };

    return (
        <div className="socials">
            <button className="google" onClick={google}>
                <FaGoogle />
                Log in with Google
            </button>
            <button className="github" onClick={github}>
                <FaGithubSquare />
                Log in with Github
            </button>
            <button className="facebook" onClick={facebook}>
                <FaFacebookSquare />
                Log in with Facebook
            </button>
        </div>
    );
}

export default Socials;
