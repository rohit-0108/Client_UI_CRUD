import type { AxiosResponse } from "axios";
import type { Product, ProductRequest } from "../types";
import axiosInstance from "./axiosInstance";

export const getAllProducts = (): Promise<AxiosResponse<Product[]>> =>
  axiosInstance.get<Product[]>("/api/Product/GetAll");

export const getProductById = (id: number): Promise<AxiosResponse<Product>> =>
  axiosInstance.get<Product>(`/api/Product/${id}`);

export const createProduct = (data: ProductRequest): Promise<AxiosResponse<Product>> =>
  axiosInstance.post<Product>("/api/Product", data);

export const updateProduct = (data: ProductRequest): Promise<AxiosResponse<Product>> =>
  axiosInstance.put<Product>("/api/Product", data);

export const deleteProduct = (id: number): Promise<AxiosResponse> =>
  axiosInstance.delete(`/api/Product/${id}`);