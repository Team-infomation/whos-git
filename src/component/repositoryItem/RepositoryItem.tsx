// MODULE
import styled from "styled-components";
// COMPONENT
import UpdateAt from "../common/updateAt";
// TYPE
interface Props {
  repoData: any;
}
// STYLED
const RepoBox = styled.div`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--light-gray);
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
`;
const RepositoryItem: React.FC<Props> = ({ repoData }) => {
  const handleCopyGeiCloneURL = (url: string) => {
    console.log(url);
  };
  return (
    <RepoBox className="flex flex_ai_c flex_jc_sb">
      <h2>{repoData.name}</h2>
      <UpdateAt updatedAt={repoData.updated_at} textType={"commit"} />
      <button onClick={() => handleCopyGeiCloneURL(repoData.clone_url)}>
        Clone
      </button>
    </RepoBox>
  );
};

export default RepositoryItem;
