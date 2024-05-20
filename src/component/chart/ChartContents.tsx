// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
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

const YearSelectBox: React.FC = () => {
  return <></>;
};

const ChartContents: React.FC<ChartContentType> = ({ id, repoName }) => {
  const [minYear, setMinYear] = useState<number>(0);
  // const [yearList, setYearList] = useState<object[]>([]);
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

  const StorageData: string | any = localStorage.getItem("userData");

  const yearList: object[] = [];
  const maxYear = new Date().getFullYear();
  const setttingYearList = () => {
    for (let i = minYear; i <= maxYear; i++) {
      yearList.push({ i });
    }
  };
  useLayoutEffect(() => {
    setMinYear(Number(JSON.parse(StorageData).created_at.slice(0, 4)));
    setttingYearList();
  }, [maxYear]);

  useEffect(() => {
    fetchNextPage();
  }, [data]);
  console.log(yearList);
  return (
    <>
      <div>
        <input type="text" />
      </div>
      <div className="year_test">
        {/* {yearList.map((item) => (
          <p key={item}>{item}</p>
        ))} */}
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
