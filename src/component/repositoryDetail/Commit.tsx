// MODULE
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// API
import { memberRepositoryCommitGET } from "../../api/github";
import { useEffect, useState } from "react";
// UTIL
import { DateFormChange } from "../../util/UnitCalculator";
import { Link } from "react-router-dom";
// STYLED
const ListBoxFrame = styled.div`
  border: 1px solid var(--light-gray);
`;
const ListBox = styled.li`
  padding: 1rem;
  border-bottom: 1px solid var(--light-gray);
  > div {
    flex-grow: 1;
    .message {
      font-size: 2rem;
      font-weight: 600;
    }
    .push_id {
      flex-basis: 25%;
      font-weight: 700;
      p {
        font-size: 1.4rem;
      }
    }
    .commit_dt {
      font-weight: 700;
      color: var(--light-gray);
      p {
        font-size: 1.4rem;
      }
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 12rem;
    height: 2.5rem;
    margin-left: 2rem;
    background: #314d76;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);
  }
`;

// TYPE
type CommitTypes = {
  id: string;
  repoName: string;
  page: number;
  listRef: any;
  data: object;
};

const useGetRepositoryCommitList = (
  id: string,
  repoName: string,
  page: number
) => {
  return useInfiniteQuery({
    queryKey: ["commit-history", id, repoName, page],
    queryFn: ({ pageParam = page }) =>
      memberRepositoryCommitGET(id, repoName, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: object) => {
      console.log(pages);
    },
  });
};
const ResultItem: React.FC<CommitTypes> = ({ data, listRef }) => {
  return (
    <ul>
      {data !== undefined &&
        data.map((item: any | object[], index: number) => (
          <ListBox key={index} className="flex flex_jc_sb flex_ai_c">
            <div className="flex flex_jc_s flex_ai_c flex_wrap_wrap">
              <div className="message width_100p flex flex_ai_c">
                <p>
                  {index} : {item.commit.message}
                </p>
              </div>
              <div className="push_id flex flex_ai_c">
                <p>User :&ensp;</p>
                <p> {item.commit.author.name}</p>
              </div>
              <div className="commit_dt flex flex_ai_c">
                <p>Date :&ensp;</p>
                <p> {DateFormChange(item.commit.author.date)}</p>
              </div>
            </div>
            <Link
              to={item.html_url}
              target="_blank"
              className="flex flex_jc_c flex_ai_c"
            >
              github로 이동
            </Link>
          </ListBox>
        ))}
      {data !== undefined && data?.length > 29 && <li ref={listRef}></li>}
    </ul>
  );
};

const Commit: React.FC<CommitTypes> = ({ id, repoName }) => {
  const StorageData: any | object = localStorage.getItem("userData");

  const [commitData, setCommitData] = useState<object[]>([]);
  const [page, setPage] = useState<number>(1);
  const [listRef, listInView] = useInView();

  // const { data, fetchNextPage }: any = useGetRepositoryCommitList(
  //   id,
  //   repoName,
  //   page
  // );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["commit-history", id, repoName],
    queryFn: ({ pageParam }) =>
      memberRepositoryCommitGET(id, repoName, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    maxPages: 5,
  });
  useEffect(() => {
    setCommitData(data?.pages[0].data);
    if (listInView) {
      if (page < 5 && !isFetchingNextPage) {
        setPage(page + 1);
        fetchNextPage();
        // setCommitData((prevData) => [...prevData, ...data?.pages[page].data]);
        // setCommitData(
        //   data?.pages.map((item: unknown | any) => item.data).flat()
        // );
      }
    }
  }, [listInView, data]);
  return (
    <ListBoxFrame>
      <div>Commit History</div>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <ResultItem
        data={data?.pages.map((item: unknown | any) => item.data).flat()}
        listRef={listRef}
      />
    </ListBoxFrame>
  );
};

export default Commit;
