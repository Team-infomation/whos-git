// MODULE
import { useNavigate } from "react-router-dom";
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
  follower: string;
}
// STYLED
const MiddleBox = styled.div`
  flex-basis: 50%;
  margin-left: 2.5rem;
`;
const ResultBox = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
`;
const AvatarBox = styled.div`
  flex-basis: 8rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  overflow: hidden;
`;
const ResultItem: React.FC<Props> = ({ login, type, avatar, follower }) => {
  const navigate = useNavigate();
  const handleMoveMemberDetail = () => {
    navigate(`/${login}`, { state: { id: login } });
    localStorage.removeItem("userData");
  };
  return (
    <ResultBox
      className="flex cursor_p"
      onClick={() => handleMoveMemberDetail()}
    >
      <AvatarBox>
        <img src={avatar} alt="" loading="lazy" width={80} height={80} />
      </AvatarBox>
      <MiddleBox className="flex flex_dir_c flex_jc_sb">
        <div className="flex flex_ai_c">
          <LoginId login={login} />
        </div>
        <div className="flex">
          <div>Follower : {follower}</div>
          <div>Following : </div>
        </div>
      </MiddleBox>
      <Type type={type} />
    </ResultBox>
  );
};

export default ResultItem;
