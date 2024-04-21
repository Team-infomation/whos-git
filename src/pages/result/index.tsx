// MODULE
import styled from "styled-components";
// ZUSTAND
// TYPE
interface Props {}
// STYLED

import ResultItem from "../../component/resultItem";
import { searchStore } from "../../store/searchStore";
const Result: React.FC<Props> = () => {
  const { searchResult, keyword } = searchStore();
  const totalCount: number = searchResult.total_count;
  const resultObject = searchResult.items;
  console.log(searchResult);
  return (
    <div className="con">
      검색어 {keyword}에 대한 검색결과
      <br />총<span>{totalCount}개</span>의 결과
      <ul>
        {resultObject.map((item: any) => (
          <li key={item.login}>
            <ResultItem
              login={item.login}
              id={item.id}
              type={item.type}
              avatar={item.avatar_url}
              follower={item.followers_url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
