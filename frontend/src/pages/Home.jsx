import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex flex-col items-center rounded-md shadow-md bg-white max-w-md p-4">
                <h1 className="font-semibold">Welcome {user && user.name}</h1>
            </div>
        </div>
    );
}

export default Home;
