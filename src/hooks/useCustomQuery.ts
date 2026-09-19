import {
  useQuery,
  type QueryFunction,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type CustomQueryOptions<TData> = Omit<UseQueryOptions<TData>, "queryKey" | "queryFn"> & {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData, QueryKey>;
};

export function useCustomQuery<TData>({
  queryKey,
  queryFn,
  ...queryOptions
}: CustomQueryOptions<TData>) {
  const queryResult = useQuery<TData>({
    queryKey,
    queryFn,
    ...queryOptions,
  });

  return queryResult;
}
