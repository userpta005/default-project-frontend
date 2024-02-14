import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'src/stores/auth';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.api });

export default boot(({}) => {
  api.interceptors.request.use((request) => {
    const auth = useAuthStore();
    if (auth.token) {
      request.headers.Authorization = `Bearer ${auth.token}`;
    }
    return request;
  });
  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      if (error.response) {
        const response = error.response;

        if (response.status === 401) {
          const auth = useAuthStore();
          auth.resetAuth();
        }

        return Promise.reject(response.data.message);
      }
      return Promise.reject(error.message);
    }
  );
});

export { api };
