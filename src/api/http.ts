import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { RefreshTokenResponseDTO } from "@/types/api";
const BASE_URL = "/api"; // chỉnh cho phù hợp

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // để gửi kèm refresh cookie
});

let accessToken: string | null = null;
let refreshing = false;
let waiters: Array<(t: string | null) => void> = [];

export function setAccessToken(token: string | null) {
  accessToken = token;
}

http.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  if (accessToken) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${accessToken}`;    
  }
  return cfg;
});

// Gọi refresh; backend đọc refresh token từ HttpOnly cookie và trả accessToken mới
async function doRefresh(): Promise<string> {
//   const { data } = await axios.post<RefreshTokenResponseDTO>(
//     `${BASE_URL}/auth/refresh`,
//     {},
//     { withCredentials: true }
//   );
//   return data.accessToken;
  return "new-token";
}

http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    // Chỉ xử lý 401 một lần/req và KHÔNG tự refresh cho chính các endpoint auth
    const isAuthPath = original?.url?.includes("/auth/");
    if (status === 401 && !original._retry && !isAuthPath) {
      original._retry = true;

      if (!refreshing) {
        refreshing = true;
        try {
          const newToken = await doRefresh();
          setAccessToken(newToken);
          waiters.forEach((w) => w(newToken));
        } catch {
          setAccessToken(null);
          waiters.forEach((w) => w(null));
        } finally {
          waiters = [];
          refreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        waiters.push(async (t) => {
          if (!t) return reject(error);
          // gắn token mới và retry
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${t}`;
          try {
            resolve(await axios(original));
          } catch (e) {
            reject(e);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

// Bootstrap phiên khi app khởi động
export async function bootstrapSession() {
  try {
    const newToken = await doRefresh(); // nếu còn refresh cookie hợp lệ
    setAccessToken(newToken);
  } catch {
    setAccessToken(null);
  }
}

export function clearSession() {
  setAccessToken(null);
}
