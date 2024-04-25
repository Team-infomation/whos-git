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
const CloneButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 8rem;
  height: 2.5rem;
  background: #314d76;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--white);
`;
const RepositoryItem: React.FC<Props> = ({ repoData }) => {
  const handleCopyGeiCloneURL = (url: string) => {
    console.log(url);
  };
  return (
    <RepoBox className="flex flex_ai_c flex_jc_sb">
      <h2>{repoData.name}</h2>
      <UpdateAt updatedAt={repoData.updated_at} textType={"commit"} />
      <CloneButton onClick={() => handleCopyGeiCloneURL(repoData.clone_url)}>
        Clone
      </CloneButton>
    </RepoBox>
  );
};

export default RepositoryItem;
