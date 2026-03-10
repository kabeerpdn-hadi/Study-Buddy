import axios from "axios";
import useUserStore from "../store/useUserStore"

const removeUser = () => useUserStore.getState().setUser(null)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      if (error.config.url === "/api/auth/refresh-token") {
        removeUser()
        window.location.href = "/login"
        return Promise.reject(error)
      }
      await axiosInstance.post("/api/auth/refresh-token")
      return axiosInstance(error.config)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance;