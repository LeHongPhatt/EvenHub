import axiosClient from './axiosClient';

class AuthAPI {
  async handleAuthentication(
    url: string,
    data: any = {},
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
    token?: string
  ) {
    try {
      const res = await axiosClient(`/auth${url}`, {
        method,
        ...(method !== 'get' ? { data } : {}),
        headers: token
          ? {
            Authorization: `Bearer ${token}`, // 👈 FIX QUAN TRỌNG NHẤT
          }
          : {},
      });

      return res;
    } catch (error) {
      console.error('AuthAPI Error:', error);
      throw error;
    }
  }
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
