// MODULE
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// API
import { memberRepositoryCommitGET } from "../../api/github";
import { useEffect, useState } from "react";
// STYLED
const ListBoxFrame = styled.div`
  border: 1px solid var(--light-gray);
  .request_name {
    padding-left: 0.5rem;
    i {
      margin-right: 1rem;
      font-size: 2.5rem;
    }
    border-bottom: 1px solid var(--light-gray);
    li {
      padding: 0.5rem 0;
      border-bottom: none !important;
      font-size: 2rem;
      &:hover {
        font-weight: inherit;
      }
      button {
        color: var(--blue);
        &:hover {
          font-weight: 600;
        }
      }
    }
  }
  ul {
    li {
      padding: 0.5rem;
      font-weight: 500;
      transition: all 0.3s;
      &:not(:last-child) {
        border-bottom: 1px solid var(--light-gray);
      }
      &:hover {
        font-weight: 600;
      }
      i {
        margin-right: 1rem;
        font-size: 1.8rem;
      }
    }
  }
`;
// TYPE
type CommitTypes = {
  id: string;
  repoName: string;
  page: number;
};

const useGetRepositoryCommitList = (
  id: string,
  repoName: string,
  page: number
) => {
  return useQuery({
    queryKey: ["commit-history", id, repoName, page],
    queryFn: () => memberRepositoryCommitGET(id, repoName, page),
    staleTime: 1000 * 60 * 60,
  });
};
const Commit: React.FC<CommitTypes> = ({ id, repoName }) => {
  const StorageData: any | object = localStorage.getItem("userData");

  const [page, setPage] = useState<number>(1);

  const getCommitData = async () => {
    try {
      const response: any | object = await memberRepositoryCommitGET(
        JSON.parse(StorageData).login,
        repoName,
        page
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <ListBoxFrame>
      <div>최근 100개 커밋</div>
      <button onClick={() => getCommitData()}>커밋 가져오기</button>
    </ListBoxFrame>
  );
};

export default Commit;
