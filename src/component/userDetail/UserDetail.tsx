// MODULE
import styled from "styled-components";
import LoginId from "../common/loginId";
// TYPE
interface Props {
  avatar: string;
  loginId: string;
}
// STYLED
const AvatarBox = styled.div`
  flex-basis: 8rem;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  overflow: hidden;
`;

const TabMenu = () => {
  return <></>;
};
const UserDetail: React.FC<Props> = ({ avatar, loginId }) => {
  return (
    <>
      <AvatarBox>
        <img src={avatar} alt="" loading="lazy" width={120} height={120} />
      </AvatarBox>
      <LoginId login={loginId} />
      <div>
        <TabMenu />
      </div>
    </>
  );
};

export default UserDetail;
