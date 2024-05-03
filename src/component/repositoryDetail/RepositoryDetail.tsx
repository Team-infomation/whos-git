// MODULE
import { useEffect, useState } from "react";
import styled from "styled-components";
// API
import {
  memberRepoReadMeGET,
  memberRepositoryCommitGET,
} from "../../api/github";
import {
  addRepositoryReadmeDataToIndexedDB,
  getRepositoryReadmeDataToIndexedDB,
} from "../../api/IDBcache";
// COMPONENT
import README from "../README";
// TYPE
interface Props {
  apiData: object | any;
  repoName: string;
}
// STYLED
const TabButton = styled.div`
  margin-top: 9.5rem;
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
const RepositoryDetail: React.FC<Props> = ({ apiData, repoName }) => {
  const [tabActive, setTabActive] = useState<string>("readme");
  const [readMe, setReadMe] = useState<string>("");

  const StorageData: any | object = localStorage.getItem("userData");

  const handleTabmenuButton = (value: string) => {
    setTabActive(value);
  };

  // API
  const getReadMe = async () => {
    try {
      const response: any | object = await memberRepoReadMeGET(
        JSON.parse(StorageData).login,
        repoName
      );
      setReadMe(response.data.content);
      addRepositoryReadmeDataToIndexedDB(
        response.data.content,
        repoName,
        JSON.parse(StorageData).login
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCommitData = async () => {
    try {
      const response: any | object = await memberRepositoryCommitGET(
        JSON.parse(StorageData).login,
        repoName
      );
    } catch (error) {
      console.log(error);
    }
  };

  let readmeElement;
  for (let i = 0; i < apiData.length; i++) {
    if (apiData[i].name === "README.md") {
      readmeElement = apiData[i];
      break;
    }
  }
  if (readmeElement) {
    getReadMe();
  }

  useEffect(() => {
    setTimeout(() => {
      getRepositoryReadmeDataToIndexedDB(
        JSON.parse(StorageData).login,
        repoName
      );
    }, 1000);
  }, []);
  return (
    <div className="con">
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
            <button onClick={() => handleTabmenuButton("repo")} value="repo">
              Repository
            </button>
          </li>
          <li
            id="chart"
            className={`${
              tabActive === "chart" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button onClick={() => handleTabmenuButton("chart")} value="chart">
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
            >
              Commit
            </button>
          </li>
        </ul>
      </TabButton>
      {tabActive === "readme" && readMe !== "" && <README readme={readMe} />}
      {tabActive === "commit" && (
        <>
          <div>최근 100개 커밋</div>
          <button onClick={() => getCommitData()}>커밋 가져오기</button>
        </>
      )}
    </div>
  );
};

export default RepositoryDetail;
