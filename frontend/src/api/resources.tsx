import { Resource, ResourceRequest } from "../types";
import { apiClient } from "./client";
import { ApiClientBasePath } from "./paths";

export const fetchResources = async () => {
  const response = await apiClient.get<Resource[]>(ApiClientBasePath.RESOURCES);
  return response.data;
};

export const createResource = async (data: ResourceRequest) => {
  const response = await apiClient.post<Resource>(ApiClientBasePath.RESOURCES, data);
  return response.data;
};

export const deleteResource = async (id: number) => {
  await apiClient.delete(`${ApiClientBasePath.RESOURCES}/${id}`);
};

export const updateResource = async (id: number, data: ResourceRequest) => {
  const response = await apiClient.put<Resource>(`${ApiClientBasePath.RESOURCES}/${id}`, data);
  return response.data;
};
