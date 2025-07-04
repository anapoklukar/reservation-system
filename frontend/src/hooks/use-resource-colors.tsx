import { useMemo } from "react";
import { Resource } from "../types";
import { RESOURCE_COLORS } from "../constants/colors";

export const useResourceColors = (resources: Resource[]) => {
  return useMemo(() => {
    return resources.map((resource, index) => ({
      ...resource,
      color: resource.color || RESOURCE_COLORS[index % RESOURCE_COLORS.length],
    }));
  }, [resources]);
};
