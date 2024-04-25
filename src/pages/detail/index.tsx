// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollRestoration, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// ZUSTAND
import { commonStore } from "../../store/commonStore";
// API
import {
  memberInfoGET,
  memberProfileRepoGET,
  memberRepositoryListGET,
} from "../../api/github";
// COMPONENT
import UserDetailInfo from "../../component/userDetailInfo";
import RepositoryItem from "../../component/repositoryItem";
// TYPE
interface Props {
  public_repo_count: number;
  public_repo: any;
  listRef: any;
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
      pointer: crosshair;
    }
  }
`;
const RepositoryList: React.FC<Props> = ({
  public_repo_count,
  public_repo,
  listRef,
}) => {
  return (
    <RepoBox>
      <h5>
        총<span> {public_repo_count}</span>개의 저장소를 볼 수 있어요
      </h5>
      <ul>
        {public_repo !== null &&
          public_repo.map((repo: any) => (
            <li key={repo.id}>
              <RepositoryItem repoData={repo} />
            </li>
          ))}
        {public_repo !== null && public_repo.length > 29 && (
          <li ref={listRef}></li>
        )}
      </ul>
    </RepoBox>
  );
};

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const { setHeaderFixed } = commonStore();

  const [userData, setUserData] = useState<any>(null);
  const [profileRepo, setProfileRepo] = useState<any | string>(null);
  const [publicRepo, setPublicRepo] = useState<any | object>(null);
  const [page, setPage] = useState<number>(1);
  const [tabActive, setTabActive] = useState<string>("repo");
  const [ref, inView] = useInView();
  const [listRef, listInView] = useInView();

  const StorageData: unknown | any = localStorage.getItem("userData");
  const MaxPage: number = Math.ceil(userData?.public_repos / 30);
  const getMemberInfo = async () => {
    try {
      const response: unknown | any = await memberInfoGET(state.id);
      setUserData(response?.data);
      localStorage.setItem("userData", JSON.stringify(response?.data));
      getCurrentUserRepoList(response?.data.repos_url, page);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("로딩완료");
    }
  };
  const getMemberProfileREADME = async () => {
    try {
      const response: unknown | any = await memberProfileRepoGET(state.id);
      setProfileRepo(response?.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUserRepoList = async (url: string, page: number) => {
    try {
      const response: unknown | any = await memberRepositoryListGET(url, page);
      setPublicRepo(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (StorageData === null) {
      getMemberInfo();
    } else {
      setUserData(JSON.parse(StorageData));
      getCurrentUserRepoList(JSON.parse(StorageData).repos_url, page);
    }
    getMemberProfileREADME();
  }, []);

  useEffect(() => {
    const nextPage = page + 1;
    const scrollRepoList = async (url: string, page: number) => {
      try {
        const response: unknown | any = await memberRepositoryListGET(
          url,
          page
        );
        setPublicRepo((prevData: unknown | any) => [
          ...prevData,
          ...response?.data,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    if (inView) {
      setHeaderFixed(false);
    } else {
      setHeaderFixed(true);
    }
    if (listInView && page < MaxPage) {
      setPage(page + 1);
      scrollRepoList(JSON.parse(StorageData).repos_url, nextPage);
    }
  }, [inView, listInView]);
  return (
    <div className="con">
      <div className="observer_box" ref={ref}>
        <UserDetailInfo
          avatar={userData?.avatar_url}
          loginId={userData?.login}
          profileRepo={profileRepo}
          bio={userData?.bio}
        />
      </div>
      <TabButton>
        <ul className="flex flex_ai_c">
          <li id="repo" className="active flex flex_jc_c flex_ai_c cursor_p">
            Repository
          </li>
          <li id="chart" className="flex flex_jc_c flex_ai_c cursor_p">
            Chart
          </li>
        </ul>
      </TabButton>
      <div>
        <ScrollRestoration />
        <RepositoryList
          public_repo_count={userData?.public_repos}
          public_repo={publicRepo}
          listRef={listRef}
        />
      </div>
    </div>
  );
};

export default MemberDetail;
