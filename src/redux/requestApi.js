import { loginRoute } from '../utils/APIRoutes';
import { loginStart, loginSuccess, loginFailed } from './authSlice';


import axios from 'axios';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const data = await axios.post(loginRoute, user);
        await dispatch(loginSuccess(data.data));
        navigate('/')
    } catch (error) {
        await dispatch(loginFailed(error.response.data.data));
        return error.response.data.data;
        
    }
}