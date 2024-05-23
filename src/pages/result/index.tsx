// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// API
import { memberSearchGET } from "../../api/github";
// ZUSTAND
import { searchStore } from "../../store/searchStore";
// COMPONENT
import ResultItem from "../../component/resultItem";
import Skeleton from "../../component/common/skeleton";
// TYPE
type Props = {
  item: Repo;
  items: Repo;
  data: ResultProps;
};
type ResultProps = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  total_count: number;
  items: any;
};
type Repo = {
  length: number;
  login: string;
  id: number;
  type: string;
  avatar_url: string;
  followers_url: string;
};

// STYLED
const ResultSection = styled.div`
  margin-top: 12rem;
  p {
    font-size: 2.4rem;
    span {
      font-size: 2.4rem;
      font-weight: 700;
    }
  }
`;

const Result: React.FC<Props> = () => {
  const { searchResult, page, setPage, keyword } = searchStore();
  const { state } = useLocation();
  const totalCount: any | number = searchResult?.total_count;
  const resultObject = searchResult?.items;
  const MaxPage: number = Math.ceil(totalCount / 30);

  const [data, setData] = useState<Repo | null>(null);
  const [listRef, listInView] = useInView();
  useEffect(() => {
    const nextPage = page + 1;
    const scrollSearchMember = async (nextPage: number) => {
      try {
        const response: ResultProps | unknown = await memberSearchGET(
          keyword,
          nextPage
        );
        setData((prevData) => [...prevData, ...response?.data.items]);
      } catch (error) {
        console.log(error);
      }
    };
    if (listInView && page < MaxPage) {
      setPage(page + 1);
      scrollSearchMember(nextPage);
    } else {
      return;
    }
  }, [listInView]);
  useLayoutEffect(() => {
    setData(resultObject);
  }, [resultObject]);
  return (
    <div className="con">
      <ResultSection>
        <p>
          검색어 <span>'{state.searchKeyword}'</span>에 대한 검색결과
        </p>
        <br />총<span>{totalCount}개</span>의 결과
        <ul>
          {data !== null ? (
            Array.isArray(data) &&
            data.map((item: Repo, index: number) => (
              <li key={index}>
                <ResultItem
                  login={item.login}
                  id={item.id}
                  type={item.type}
                  avatar={item.avatar_url}
                  follower={item.followers_url}
                />
              </li>
            ))
          ) : (
            <Skeleton type={"search_result"} count={6} />
          )}
          {data !== null && data.length > 29 && <li ref={listRef}></li>}
        </ul>
      </ResultSection>
    </div>
  );
};

export default Result;
