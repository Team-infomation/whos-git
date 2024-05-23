// MODULE
import styled from "styled-components";
// TYPE
type SkeletonProps = {
  type: string;
  count: number;
};
// STYLED
const SearchResultType = styled.div``;
const Skeleton: React.FC<SkeletonProps> = ({ type, count }) => {
  return (
    <>{type === "search_result" ? <SearchResultType></SearchResultType> : ""}</>
  );
};

export default Skeleton;
