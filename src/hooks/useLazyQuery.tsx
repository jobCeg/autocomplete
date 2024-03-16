import { useCallback, useState } from 'react';

interface useLazyQueryProps<QueryFnType> {
  queryFn: QueryFnType;
}

let controller: AbortController;

export function useLazyQuery<
  QueryFnType extends (options?: RequestInit) => ResponseType,
  ResponseType,
>({ queryFn }: useLazyQueryProps<QueryFnType>) {
  const [data, setData] = useState<Awaited<ResponseType> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(
    async (options?: RequestInit) => {
      setLoading(true);
      try {
        controller = new AbortController();
        const signal = controller.signal;
        const data = await queryFn({
          signal,
          ...options,
        });
        setData(data);
      } catch (error) {
        // we can look for different error instances in case we more than one
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [queryFn]
  );

  const abort = useCallback(() => {
    if (controller) {
      setLoading(false);
      controller.abort();
    }
  }, []);

  return { abort, data, error, fetch, loading };
}
