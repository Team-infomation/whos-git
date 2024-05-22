// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
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
// STYLED
const YearSelectMenuBox = styled.div``;
const ChartFrame = styled.div`
  border: 1px solid var(--gray);
  overflow: auto;
  scrollbar-width: none;
`;

const ChartType = [
  {
    name: "calender",
    code: 0,
  },
  {
    name: "bar",
    code: 1,
  },
];

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

  const StorageData: string | any = localStorage.getItem("userData");

  const yearList: object[] = [];
  const minYear = Number(JSON.parse(StorageData).created_at.slice(0, 4));
  const maxYear = new Date().getFullYear();

  const handleChangeSelectYears = (year: number) => {
    setYear(year);
  };
  useEffect(() => {
    for (let i = minYear; i <= maxYear; i++) {
      yearList.push({ i });
    }
    setCommitData(yearList);
  });

  useEffect(() => {
    fetchNextPage();
  }, [data]);
  return (
    <>
      <YearSelectMenuBox>
        <ul className="year_list flex flex_jc_s flex_ai_c">
          {commitData.length !== 0 &&
            commitData?.map((item, index) => (
              <li
                key={index}
                style={{ marginRight: "1rem" }}
                className={item.i === year && "this"}
              >
                <button onClick={() => handleChangeSelectYears(item.i)}>
                  {item.i}
                </button>
              </li>
            ))}
        </ul>
      </YearSelectMenuBox>
      <ChartFrame>
        {!isFetching && !isFetchingNextPage && !hasNextPage && (
          <D3Calendar
            id={id}
            repoName={repoName}
            year={year}
            propsData={data?.pages.flatMap((page) => page.data)}
          />
        )}
      </ChartFrame>
    </>
  );
};

export default ChartContents;
