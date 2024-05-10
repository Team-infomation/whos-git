// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// ZUSTAND
import { commonStore } from "../../store/commonStore";
// API
import {
  memberInfoGET,
  memberRepoReadMeGET,
  memberRepositoryListGET,
} from "../../api/github";
import {
  addResultMemberDataToIndexedDB,
  getResultMemberDataToIndexedDB,
} from "../../api/IDBcache";
// COMPONENT
import UserDetailInfo from "../../component/userDetailInfo";
import RepositoryItem from "../../component/repositoryItem";
import Test from "../../component/chart/test/Test";
// TYPE
interface Props {
  public_repo_count: number | null;
  public_repo: Repo | any;
  loginId: string;
  listRef: any;
}
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
const RepoBox = styled.div`
  padding: 2rem;
  border: 1px solid var(--light-gray);
  h5 {
    font-size: 1.6rem;
    font-weight: 600;
    span {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
  ul {
    margin-top: 2rem;
    li {
      cursor: crosshair;
    }
  }
`;
const RepositoryList: React.FC<Props> = ({
  public_repo_count,
  public_repo,
  loginId,
  listRef,
}) => {
  const navigate = useNavigate();
  return (
    <RepoBox>
      <h5>
        총<span> {public_repo_count}</span>개의 저장소를 볼 수 있어요
      </h5>
      <ul>
        {public_repo !== null &&
          Array.isArray(public_repo) &&
          public_repo.map((repo: Repo) => (
            <li
              key={repo.id}
              onClick={() =>
                navigate(`/${loginId}/${repo.name}`, {
                  state: { loginId: loginId, repoName: repo.name },
                })
              }
            >
              <RepositoryItem repoData={repo} />
            </li>
          ))}
        {public_repo !== null && public_repo?.length > 29 && (
          <li ref={listRef}></li>
        )}
      </ul>
    </RepoBox>
  );
};

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const { setHeaderFixed, detailView, setDetailView } = commonStore();

  const [userData, setUserData] = useState<Repo | any>(null);
  const [profileRepo, setProfileRepo] = useState<string>("");
  const [publicRepo, setPublicRepo] = useState<unknown | object>(null);
  const [APIData, setAPIData] = useState<object | any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [tabActive, setTabActive] = useState<string>("repo");
  const [repoName, setRepoName] = useState<string>("");
  const [ref, inView] = useInView();
  const [listRef, listInView] = useInView();

  const StorageData = localStorage.getItem("userData");
  const MaxPage: number =
    userData !== null ? Math.ceil(userData.public_repos / 30) : 0;

  const handleTabMenuButton = (value: string) => {
    setTabActive(value);
  };

  const getMemberInfo = async () => {
    const setTime = new Date();
    const getIndexedDB: any | Repo = await getResultMemberDataToIndexedDB(
      state.id
    );
    if (Array.isArray(getIndexedDB) && getIndexedDB.length === 0) {
      try {
        const response: any | Repo = await memberInfoGET(state.id);
        setUserData(response?.data);

        localStorage.setItem("userData", JSON.stringify(response?.data));
        getCurrentUserRepoList(response?.data.repos_url, page);
      } catch (error) {
        console.log(error);
      } finally {
        const responseReadme: any | Repo = await memberRepoReadMeGET(
          state.id,
          state.id
        );
        setProfileRepo(responseReadme?.data.content);
        await addResultMemberDataToIndexedDB(
          userData,
          responseReadme?.data.content,
          setTime,
          state.id
        );
      }
    } else {
      setUserData(getIndexedDB[0].memberResult);
      localStorage.setItem(
        "userData",
        JSON.stringify(getIndexedDB[0].memberResult)
      );
      getCurrentUserRepoList(getIndexedDB[0].memberResult.repos_url, page);
      setProfileRepo(getIndexedDB[0].readmeData);
    }
  };
  const getCurrentUserRepoList = async (url: string, page: number) => {
    try {
      const response: any | Repo = await memberRepositoryListGET(url, page);
      setPublicRepo(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    setDetailView("userInfo");
    if (StorageData === null) {
      getMemberInfo();
    } else {
      setUserData(JSON.parse(StorageData));
      getCurrentUserRepoList(JSON.parse(StorageData).repos_url, page);
    }
  }, []);

  useEffect(() => {
    const nextPage = page + 1;
    const scrollRepoList = async (url: string, page: number) => {
      try {
        const response: Repo | any = await memberRepositoryListGET(url, page);
        setPublicRepo((prevData: object[]) => [...prevData, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    if (inView) {
      setHeaderFixed(false);
    } else {
      setHeaderFixed(true);
    }
    if (listInView && page < MaxPage && StorageData !== null) {
      setPage(page + 1);
      scrollRepoList(JSON.parse(StorageData).repos_url, nextPage);
    }
  }, [inView, listInView]);
  useEffect(() => {
    getResultMemberDataToIndexedDB(state.id);
  }, []);

  return (
    <div className="con">
      <div className="observer_box" ref={ref}>
        {userData !== null && (
          <UserDetailInfo
            avatar={userData.avatar_url}
            loginId={userData.login}
            profileRepo={profileRepo}
            bio={userData.bio}
          />
        )}
      </div>
      <TabButton>
        <ul className="flex flex_ai_c">
          <li
            id="repo"
            className={`${
              tabActive === "repo" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button onClick={() => handleTabMenuButton("repo")} value="repo">
              Repository
            </button>
          </li>
          <li
            id="chart"
            className={`${
              tabActive === "chart" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button onClick={() => handleTabMenuButton("chart")} value="chart">
              Chart
            </button>
          </li>
        </ul>
      </TabButton>
      <div>
        {tabActive === "repo" ? (
          <>
            <ScrollRestoration />
            {publicRepo && userData && StorageData !== null && (
              <RepositoryList
                public_repo_count={userData?.public_repos}
                public_repo={publicRepo}
                loginId={JSON.parse(StorageData).login}
                listRef={listRef}
              />
            )}
          </>
        ) : (
          <Test />
        )}
      </div>
    </div>
  );
};

export default MemberDetail;
