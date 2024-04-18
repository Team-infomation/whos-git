// MODULE
import styled from "styled-components";
// TYPE
interface Props {
  login: string;
  id: number;
  type: string;
}
const ResultItem: React.FC<Props> = ({ login, id, type }) => {
  return (
    <>
      <div>{login}</div>
    </>
  );
};

export default ResultItem;
