import { useEffect, useState, useCallback } from "react";
import { ApiResources } from "../api";
import { Resource } from "../types";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResources = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ApiResources.fetchResources();
      setResources(data);
      setError(null);
    } catch (err) {
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  return { resources, loading, error, refetch: loadResources };
};
