import { FaGoogle, FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

function Socials() {
    const google = () => {
        window.open('http://localhost:5000/api/auth/google', '_self');
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
