// MODULE
import styled from "styled-components";
// IMAGE
import Logo from "/logo.png";
// TYPE
interface Props {
  login: string;
  id: number;
  type: string;
  avatar: string;
  follower: object;
}

const AvatarBox = styled.div``;
const ResultItem: React.FC<Props> = ({ login, id, type, avatar, follower }) => {
  console.log(follower);
  return (
    <div className="flex">
      <AvatarBox>
        <img src={avatar} alt="" loading="lazy" width={80} height={80} />
      </AvatarBox>
      <div>{login}</div>
      <div>{type}</div>
      <div>Follower : </div>
      <div>Following : </div>
    </div>
  );
};

export default ResultItem;
