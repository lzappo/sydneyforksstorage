import { useState, useEffect } from "react";

/**
 * Fetches data on mount and supports cancellation on unmount.
 * @param {() => Promise<T | null>} fetcher - Async function that returns data
 * @param {boolean} [enabled=true] - Whether to run the fetch
 * @returns {{ data: T | null, loading: boolean }}
 */
export function useFetch(fetcher, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!enabled);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetcher().then((result) => {
      if (!cancelled && result != null) {
        setData(result);
      }
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]); // fetcher omitted - caller should memoize if needed

  return { data, loading };
}
