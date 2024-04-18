// MODULE
// ZUSTAND
// TYPE
interface Props {}

import ResultItem from "../../component/resultItem";
import { searchStore } from "../../store/searchStore";
const Result: React.FC<Props> = () => {
  const { searchResult } = searchStore();
  const totalCount: number = searchResult.total_count;
  const resultObject: any = searchResult.items;
  console.log(searchResult);
  return (
    <>
      검색결과
      <br />총<span>{totalCount}개</span>의 결과
      <ul>
        {resultObject.map((item: any) => (
          <li key={item.login}>
            <ResultItem login={item.login} id={item.id} type={item.type} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Result;
