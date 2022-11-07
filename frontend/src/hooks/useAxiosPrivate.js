import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
    const { user } = useSelector((state) => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.authorization) {
                    config.headers.authorization = `Bearer ${user?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
