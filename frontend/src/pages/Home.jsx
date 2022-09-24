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
        <>
            <h1>Welcome {user && user.name}</h1>
        </>
    );
}

export default Home;
