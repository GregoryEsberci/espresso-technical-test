import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const useAsync = <T>(
  callback: () => Promise<T> | T | undefined,
  dependencies: DependencyList,
): UseAsyncResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const fetch = useCallback(async (isAborted: () => boolean = () => false) => {
    try {
      setData(undefined);
      setLoading(true);
      setError(undefined);

      const newData = await callback();

      if (!isAborted()) setData(newData);
    } catch (fetchError) {
      console.error(fetchError);

      if (!isAborted()) setError(fetchError);
    } finally {
      if (!isAborted()) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    let aborted = false;

    fetch(() => aborted);

    return () => {
      aborted = true;
    };
  }, [fetch]);

  return useMemo(() => ({ loading, data, error }), [loading, data, error]);
};

export type UseAsyncResponse<T> = {
  loading: boolean;
  data: T | undefined;
  error: unknown;
};

export default useAsync;
