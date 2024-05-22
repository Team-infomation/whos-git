// MODULE
import styled from "styled-components";
// COMPONENT
import UpdateAt from "../common/updateAt";
// TYPE
interface Props {
  repoData: Repo;
  event: any;
}
interface Repo {
  name: string;
  clone_url: string;
  updated_at: string;
}
// STYLED
const RepoBox = styled.div``;

const RepositoryItem: React.FC<Props> = ({ repoData, event }) => {
  return (
    <RepoBox className="flex flex_ai_c flex_jc_sb" onClick={() => event()}>
      <h2>{repoData.name}</h2>
      <UpdateAt updatedAt={repoData.updated_at} textType={"commit"} />
    </RepoBox>
  );
};

export default RepositoryItem;
