// MODULE
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
// API
import { memberRepositorySelectDateCommitGET } from "../../api/github";
// COMPONENT
import D3Calendar from "./calendar/D3Calendar";
// TYPE
type ChartContentType = {
  id: string;
  repoName: string;
  year: number;
};
const ChartContents: React.FC<ChartContentType> = ({ id, repoName }) => {
  const [year, setYear] = useState<number>(2022);
  const [commitData, setCommitData] = useState<any[]>([]);
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["repoCommitData", id, repoName, year],
      queryFn: ({ pageParam = 1 }) =>
        memberRepositorySelectDateCommitGET(id, repoName, pageParam, year),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        } else {
          return lastPageParam + 1;
        }
      },
      enabled: year !== 0,
    });

  useEffect(() => {
    fetchNextPage();
  }, [data]);
  return (
    <>
      <div>
        <input type="text" />
      </div>
      {!isFetching && !isFetchingNextPage && !hasNextPage && (
        <D3Calendar
          id={id}
          repoName={repoName}
          year={year}
          propsData={data?.pages.flatMap((page) => page.data)}
        />
      )}
    </>
  );
};

export default ChartContents;
