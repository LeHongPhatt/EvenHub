import axiosClient from './axiosClient';

class AuthAPI {
  async handleAuthentication(
    url: string,
    data: any = {},
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
  ) {
    try {
      const res = await axiosClient(`/auth${url}`, {
        method,
        ...(method !== 'get' ? { data } : {}), // chỉ gán data nếu không phải GET
      });

      return res;
    } catch (error) {
      // Ghi log rõ ràng khi có lỗi
      console.error("AuthAPI Error:", error);
      throw error; // cho phép bên ngoài bắt lỗi tiếp
    }
  }
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
