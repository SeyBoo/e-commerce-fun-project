import { useMemo } from "react";
import { UseQueryResult } from "react-query";
import Grid from "./grid";

interface GridInfiniteQueryProps<T> {
  query: UseQueryResult<T[], unknown>;
  renderItem: (value: T) => React.ReactNode;
  renderSkeleton: () => React.ReactNode;
}

export function GridInfiteQuery<T>({
  query,
  renderItem,
  renderSkeleton,
}: GridInfiniteQueryProps<T>) {
  const loading = useMemo(
    () => query.isLoading || query.isFetching || query.isIdle,
    [query]
  );

  return (
    <Grid
      loading={loading}
      data={query.data}
      renderItem={renderItem}
      renderSkeleton={renderSkeleton}
    />
  );
}
