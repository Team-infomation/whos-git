// MODULE
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
// ZUSTAND
import { commonStore } from "../../store/commonStore";
// API
import {
  memberRepositoryListGET,
  memberRepositoryInfoGET,
} from "../../api/github";
// STYLED
const RepositoryNameBox = styled.div`
  margin-top: 11rem;
  h3 {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;
const TypeBox = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  background: ${(props) => props.background};
  border-radius: 50%;
`;
const TabButton = styled.div`
  margin-top: 2.5rem;
  li {
    flex-basis: 13.5rem;
    height: 3.5rem;
    background: var(--gray);
    border: 1px solid var(--light-gray);
    border-bottom: none;
    font-size: 2rem;
    color: var(--white);
    &:first-child {
      border-top-left-radius: 0.5rem;
    }
    &:last-child {
      margin-left: -1px;
      border-top-right-radius: 0.5rem;
    }
    &.active {
      background: var(--white);
      color: var(--dark-gray);
    }
  }
`;
// COMPONENT
import RepositoryDetail from "../../component/repositoryDetail";
// TYPE
interface Repo {
  id: number;
  data: unknown;
  length: number;
  name: string;
  clone_url: string;
  updated_at: string;
  avatar_url: string;
  login: string;
  bio: string;
  public_repos: number;
}

const RepositoryList: React.FC<Repo> = () => {
  const location = useLocation();
  const { state } = useLocation();
  const { tabActive, setTabActive } = commonStore();

  const loginId =
    state !== null ? state.loginId : location.pathname.split("/").slice(1)[0];
  const resultRepoName =
    state !== null ? state.repoName : location.pathname.split("/").slice(1)[1];
  const [APIData, setAPIData] = useState<unknown | object>([]);
  const [repoName, setRepoName] = useState<string>("");

  const handleTabmenuButton = (value: string) => {
    setTabActive(value);
  };
  const handleChangeRepositoryDetail = async () => {
    try {
      const response: any | Repo = await memberRepositoryInfoGET(
        loginId,
        resultRepoName
      );
      setAPIData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRepoName(resultRepoName);
    }
  };

  useEffect(() => {
    handleChangeRepositoryDetail();
  }, []);
  return (
    <div className="con">
      <RepositoryNameBox className="flex flex_jc_s flex_ai_c">
        <TypeBox background={"red"}></TypeBox>
        <h3>{repoName}</h3>
      </RepositoryNameBox>
      <TabButton>
        <ul className="flex flex_ai_c">
          <li
            id="readme"
            className={`${
              tabActive === "readme" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("readme")}
              value="readme"
              className="flex flex_jc_c flex_ai_c"
            >
              README.md
            </button>
          </li>
          <li
            id="repo"
            className={`${
              tabActive === "repo" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("repo")}
              value="repo"
              className="flex flex_jc_c flex_ai_c"
            >
              Repository
            </button>
          </li>
          <li
            id="chart"
            className={`${
              tabActive === "chart" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("chart")}
              value="chart"
              className="flex flex_jc_c flex_ai_c"
            >
              Chart
            </button>
          </li>
          <li
            id="commit"
            className={`${
              tabActive === "commit" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("commit")}
              value="commit"
              className="flex flex_jc_c flex_ai_c"
            >
              Commit
            </button>
          </li>
        </ul>
      </TabButton>
      <RepositoryDetail apiData={APIData} repoName={resultRepoName} />
      {/* <FileList listData={APIData} id={loginId} repoName={resultRepoName} /> */}
    </div>
  );
};

export default RepositoryList;
