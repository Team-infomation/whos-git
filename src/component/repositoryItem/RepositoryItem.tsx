// MODULE
import styled from "styled-components";
// COMPONENT
import UpdateAt from "../common/updateAt";
// TYPE
interface Props {
  repoData: Repo;
}
interface Repo {
  name: string;
  clone_url: string;
  updated_at: string;
}
// STYLED
const RepoBox = styled.div`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--light-gray);
  h2 {
    flex-grow: 1;
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
  margin-left: 2rem;
  background: #314d76;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--white);
`;
const RepositoryItem: React.FC<Props> = ({ repoData }) => {
  const handleCopyGeiCloneURL = (url: string, repoName: string) => {
    window.navigator.clipboard.writeText(url).then(() => {
      alert(`${repoName} 리포지토리 주소가 복사되었습니다!`);
    });
  };
  return (
    <RepoBox className="flex flex_ai_c flex_jc_sb">
      <h2>{repoData.name}</h2>
      <UpdateAt updatedAt={repoData.updated_at} textType={"commit"} />
      <CloneButton
        onClick={() =>
          handleCopyGeiCloneURL(repoData.clone_url, repoData?.name)
        }
      >
        Clone
      </CloneButton>
    </RepoBox>
  );
};

export default RepositoryItem;
