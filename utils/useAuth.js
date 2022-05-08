import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/actions/authActions';
import { getCookie } from './cookie';
import { AUTH_USER_URL} from '../utils/urls';


const useAuth = () => {
    const dispatch = useDispatch();
    const [isAuthFetching, setIsAuthFetching] = useState(true);
    const [authError, setAuthError] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            
            try {
                const token = getCookie('token');
                if (!token) {
                    setIsAuthFetching(false);
                    return;
                }
                axios.defaults.headers.common = { Authorization: "Bearer "+token };
                const { data } = await axios.get(AUTH_USER_URL);
                if (!data) {
                    setIsAuthFetching(false);
                    return;
                }
                const { id, full_name} = data;
                dispatch(setAuthUser({
                    id,
                    full_name
                }));
                setAuthError(null);
            }
            catch (error) {
                setAuthError(error);
            }
            finally {
                setIsAuthFetching(false);
            }
        };
        fetch();
    }, [dispatch]);
    return { isAuthFetching, authError };
};
export default useAuth;
