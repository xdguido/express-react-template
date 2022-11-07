import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRefreshToken from '../hooks/useRefreshToken';

const RemindMeLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, persist } = useSelector((state) => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !user?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : isLoading ? (
                <div className="flex items-center justify-center p-4">
                    <div className="flex flex-col items-center rounded-md shadow-md bg-white max-w-xs p-4">
                        <h1 className="font-semibold">Loading...</h1>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default RemindMeLogin;
