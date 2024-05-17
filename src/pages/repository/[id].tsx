// MODULE
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// ZUSTAND
import { commonStore } from "../../store/commonStore";
// API
import { memberRepositoryInfoGET } from "../../api/github";
// STYLED
const ViewSection = styled.div`
  transition: all 0.3s;
  &.active {
    margin-top: 3.5rem;
  }
`;
const RepositoryNameBox = styled.div`
  padding-bottom: 2.5rem;
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
  background: ${(props: any) => props.background};
  border-radius: 50%;
`;
const TabButton = styled.div`
  // justify-content: flex-start;
  > * {
    transition: all 0.3s;
  }
  > div {
    flex-basis: 0;
    overflow: hidden;
    h3 {
      font-size: 2.4rem;
    }
  }
  ul {
    flex-basis: 54rem;
    li {
      position: relative;
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
        border-bottom: none;
        color: var(--dark-gray);
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background: var(--white);
        }
      }
    }
  }
  &.active {
    width: 100%;
    box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);
    > div {
      flex-basis: calc(100rem - 54rem);
      padding: 0 2rem;
      margin-left: calc((100% - 100rem) / 2);
      overflow: visible;
    }
    > ul {
      margin-right: calc((100% - 100rem) / 2);
    }
    position: fixed;
    top: 8rem;
    left: 0;
    background: var(--white);
  }
`;
// COMPONENT
import RepositoryDetail from "../../component/repositoryDetail";
import FileList from "../../component/repositoryDetail/FileList";
import Commit from "../../component/repositoryDetail/Commit";
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
  const { tabActive, setTabActive, setHeaderFixed } = commonStore();

  const loginId =
    state !== null ? state.loginId : location.pathname.split("/").slice(1)[0];
  const resultRepoName =
    state !== null ? state.repoName : location.pathname.split("/").slice(1)[1];
  const [APIData, setAPIData] = useState<unknown | object>([]);
  const [repoName, setRepoName] = useState<string>("");
  const { ref, inView } = useInView({
    rootMargin: "-80px",
  });

  const handleTabMenuButton = (value: string) => {
    setTabActive(value);
    window.scrollTo(0, 0);
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
    // handleChangeRepositoryDetail();
    if (inView) {
      console.log("작동1");
    } else {
      console.log("작동2");
    }
  }, [inView]);
  useLayoutEffect(() => {
    setTabActive("readme");
    setHeaderFixed(true);
    handleChangeRepositoryDetail();
  }, []);
  return (
    <div className="con">
      <RepositoryNameBox className={` flex flex_jc_s flex_ai_c`} ref={ref}>
        <TypeBox background={"red"}></TypeBox>
        <h3>{repoName}</h3>
      </RepositoryNameBox>
      <TabButton className={`${!inView && "active"} flex`}>
        <div className="flex flex_jc_s flex_ai_c">
          <h3>{repoName}</h3>
        </div>
        <ul className="flex flex_ai_c">
          <li
            id="readme"
            className={`${
              tabActive === "readme" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabMenuButton("readme")}
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
              onClick={() => handleTabMenuButton("repo")}
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
              onClick={() => handleTabMenuButton("chart")}
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
              onClick={() => handleTabMenuButton("commit")}
              value="commit"
              className="flex flex_jc_c flex_ai_c"
            >
              Commit
            </button>
          </li>
        </ul>
      </TabButton>
      <ViewSection className={`${!inView && "active"}`}>
        {tabActive === "readme" && (
          <RepositoryDetail apiData={APIData} repoName={resultRepoName} />
        )}
        {tabActive === "repo" && (
          <FileList listData={APIData} id={loginId} repoName={resultRepoName} />
        )}
        {tabActive === "commit" && (
          <Commit id={loginId} repoName={resultRepoName} />
        )}
      </ViewSection>
    </div>
  );
};

export default RepositoryList;
