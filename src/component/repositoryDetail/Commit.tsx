// MODULE
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// API
import { memberRepositoryCommitGET } from "../../api/github";
import { useEffect, useState } from "react";
// UTIL
import { DateFormChange } from "../../util/UnitCalculator";
import { Link } from "react-router-dom";
// STYLED
const ListBoxFrame = styled.div`
  border: 1px solid var(--light-gray);
`;
const ListBox = styled.li`
  padding: 1rem;
  border-bottom: 1px solid var(--light-gray);
  > div {
    flex-grow: 1;
    .message {
      font-size: 1.8rem;
      font-weight: 600;
    }
    .push_id {
      flex-basis: 25%;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 12rem;
    height: 2.5rem;
    margin-left: 2rem;
    background: #314d76;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);
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
const ResultItem: React.FC = ({ data }) => {
  return (
    <ul>
      {data !== undefined &&
        data.map((item: any | object[]) => (
          <ListBox
            key={item.commit.author.date}
            className="flex flex_jc_sb flex_ai_c"
          >
            <div className="flex flex_jc_s flex_ai_c flex_wrap_wrap">
              <div className="message width_100p flex flex_ai_c">
                <p>Message : </p>
                {item.commit.message}
              </div>
              <div className="push_id flex flex_ai_c">
                <p>User : </p>
                {item.commit.author.name}
              </div>
              <div className="commit_dt flex flex_ai_c">
                <p>Date : </p>
                {DateFormChange(item.commit.author.date)}
              </div>
            </div>
            <Link
              to={item.html_url}
              target="_blank"
              className="flex flex_jc_c flex_ai_c"
            >
              github로 이동
            </Link>
          </ListBox>
        ))}
    </ul>
  );
};

const Commit: React.FC<CommitTypes> = ({ id, repoName }) => {
  const StorageData: any | object = localStorage.getItem("userData");

  const [commitData, setCommitData] = useState<object[]>([]);
  const [page, setPage] = useState<number>(1);

  const { isLoading, error, data }: any = useGetRepositoryCommitList(
    id,
    repoName,
    page
  );
  console.log(isLoading, error, data);
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

  useEffect(() => {
    setCommitData(data?.data);
  }, [data]);
  console.log("commitData", commitData);
  return (
    <ListBoxFrame>
      <div>Commit History</div>
      <button onClick={() => getCommitData()}>커밋 가져오기</button>
      <ResultItem data={commitData} />
    </ListBoxFrame>
  );
};

export default Commit;
