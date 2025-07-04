import { Resource } from "../types";
import { RESOURCE_COLORS } from "../constants/colors";

export const getColoredResources = (resources: Resource[]): Resource[] => {
  return resources.map((r, i) => ({
    ...r,
    color: r.color || RESOURCE_COLORS[i % RESOURCE_COLORS.length],
  }));
};

export const getResourceName = (resources: Resource[], resourceId: number): string => {
  const resource = resources.find((r) => r.id === resourceId);
  return resource ? resource.name : "Unknown Room";
};

export const getResourceColor = (resources: Resource[], resourceId: number): string => {
  const resource = resources.find((r) => r.id === resourceId);
  return resource ? resource.color || "#ccc" : "#ccc";
};
