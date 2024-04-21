// MODULE
import styled from "styled-components";
// COMPONENT
import LoginId from "../common/loginId";
import Type from "../common/type";
// IMAGE
// TYPE
interface Props {
  login: string;
  id: number;
  type: string;
  avatar: string;
  follower: object;
}
// STYLED
const ResultBox = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
`;
const AvatarBox = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  overflow: hidden;
`;
const ResultItem: React.FC<Props> = ({ login, id, type, avatar, follower }) => {
  console.log(follower);
  return (
    <ResultBox className="flex cursor_p">
      <AvatarBox>
        <img src={avatar} alt="" loading="lazy" width={80} height={80} />
      </AvatarBox>
      <LoginId login={login} />
      <Type type={type} />
      <div>Follower : </div>
      <div>Following : </div>
    </ResultBox>
  );
};

export default ResultItem;
