// MODULE
import styled from "styled-components";
// TYPE
interface Props {
  type: string;
}
// STYLED
const TypeBox = styled.div`
  i {
    font-size: 2rem;
  }
`;
const Type: React.FC<Props> = ({ type }) => {
  return (
    <TypeBox>
      {type === "User" ? (
        <i className="xi-user"></i>
      ) : (
        <i className="xi-group"></i>
      )}
    </TypeBox>
  );
};

export default Type;
