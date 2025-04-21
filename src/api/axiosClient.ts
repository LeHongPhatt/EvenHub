import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appInfor } from '../constants/appInfor';

const getAccessToken = async () => {
  const res = await AsyncStorage.getItem('auth');
  return res ? JSON.parse(res).accesstoken : '';
};

const axiosClient = axios.create({
  baseURL: appInfor.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const accesstoken = await getAccessToken();

  config.headers = {
    Authorization: accesstoken ? `Bearer ${accesstoken}` : '',
    Accept: 'application/json',
    ...config.headers,
  };

  return config;
});

axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    console.log('❌ API ERROR:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return Promise.reject(error); // giữ nguyên error object
  }
);

export default axiosClient;
