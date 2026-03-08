import type { AxiosResponse } from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";
import axiosInstance from "./axiosInstance";

export const register = (data: RegisterRequest): Promise<AxiosResponse> =>
  axiosInstance.post("/api/Auth/register", data);

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>("/api/Auth/login", credentials);
  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  return res.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};