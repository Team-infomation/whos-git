// MODULE
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// ZUSTAND
import { searchStore } from "../../store/searchStore";
// COMPONENT
import ResultItem from "../../component/resultItem";
// TYPE
interface Props {}
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
  const { searchResult, page, setPage } = searchStore();
  const { state } = useLocation();
  const totalCount: number = searchResult.total_count;
  const resultObject = searchResult.items;
  const MaxPage = Math.ceil(totalCount / 30);

  // const [page, setPage] = useState<number>(1);
  const [listRef, listInView] = useInView();

  useEffect(() => {
    if (listInView && page < MaxPage) {
      setPage(page + 1);
      console.log("result", page);
    }
  }, [listInView, searchResult]);
  return (
    <div className="con">
      <ResultSection>
        <p>
          검색어 <span>'{state.searchKeyword}'</span>에 대한 검색결과
        </p>
        <br />총<span>{totalCount}개</span>의 결과
        <ul>
          {resultObject.map((item: any, index: number) => (
            <li key={item.login}>
              <div>{index + 1}</div>
              <ResultItem
                login={item.login}
                id={item.id}
                type={item.type}
                avatar={item.avatar_url}
                follower={item.followers_url}
              />
            </li>
          ))}
          {resultObject.length > 29 && <li ref={listRef}></li>}
        </ul>
      </ResultSection>
    </div>
  );
};

export default Result;
