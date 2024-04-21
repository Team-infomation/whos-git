// MODULE
import styled from "styled-components";
// TYPE
interface Props {
  login: string;
}
// STYLED
const MemberId = styled.div`
  margin-left: 2.5rem;
  font-size: 2.4rem;
  font-weight: 700;
`;
const LoginId: React.FC<Props> = ({ login }) => {
  return <MemberId>{login}</MemberId>;
};

export default LoginId;
