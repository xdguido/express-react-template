import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import axios from '../api/axios';

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refresh = async () => {
        const res = await axios.get('api/auth/refresh', {
            withCredentials: true
        });
        dispatch(setUser(res.data));
        return res.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
