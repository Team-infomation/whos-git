// MODULE
import styled from "styled-components";
// TYPE
interface Props {
  type: string;
}
// STYLED
const TypeBox = styled.div``;
const Type: React.FC<Props> = ({ type }) => {
  return <TypeBox>{type}</TypeBox>;
};

export default Type;
