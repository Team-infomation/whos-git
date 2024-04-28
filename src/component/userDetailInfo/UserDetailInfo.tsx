// MODULE
import styled from "styled-components";
import LoginId from "../common/loginId";
import README from "../README/README";
// TYPE
interface Props {
  avatar: string;
  loginId: string;
  profileRepo: string;
  bio: string | undefined;
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
const BioBox = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
`;
const UserDetailInfo: React.FC<Props> = ({
  avatar,
  loginId,
  profileRepo,
  bio,
}) => {
  return (
    <>
      <AvatarBox>
        <img src={avatar} alt="" loading="lazy" width={120} height={120} />
      </AvatarBox>
      <LoginId login={loginId} />
      {profileRepo === null ? (
        <BioBox>{bio !== null ? bio : ""}</BioBox>
      ) : (
        <README readme={profileRepo} />
      )}
    </>
  );
};

export default UserDetailInfo;
