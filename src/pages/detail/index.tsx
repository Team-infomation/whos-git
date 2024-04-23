// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
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
  }
`;
const RepositoryList: React.FC<Props> = ({
  public_repo_count,
  public_repo,
}) => {
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      console.log("리스트");
    } else {
    }
  }, [inView]);
  return (
    <RepoBox>
      <h5>
        총<span> {public_repo_count}</span>개의 저장소를 볼 수 있어요
      </h5>
      <ul>
        {public_repo !== null &&
          public_repo.map((repo: any, index: number) => (
            <li key={index}>
              <RepositoryItem repoData={repo} />
            </li>
          ))}
      </ul>
    </RepoBox>
  );
};

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [profileRepo, setProfileRepo] = useState<any | string>(null);
  const [publicRepo, setPublicRepo] = useState<any | object>(null);
  const [tabActive, setTabActive] = useState<string>("repo");
  const [ref, inView] = useInView();

  const { setHeaderFixed } = commonStore();
  const StorageData: unknown | any = localStorage.getItem("userData");
  const getMemberInfo = async () => {
    try {
      const response: unknown | any = await memberInfoGET(state.id);
      setUserData(response?.data);
      localStorage.setItem("userData", JSON.stringify(response?.data));
      getCurrentUserRepoList(response?.data.repos_url);
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
  const getCurrentUserRepoList = async (url: string) => {
    try {
      const response: unknown | any = await memberRepositoryListGET(url);
      console.log(response);
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
      getCurrentUserRepoList(JSON.parse(StorageData).repos_url);
    }
    getMemberProfileREADME();
  }, []);

  useEffect(() => {
    if (inView) {
      setHeaderFixed(false);
    } else {
      setHeaderFixed(true);
    }
  }, [inView]);
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
        <RepositoryList
          public_repo_count={userData?.public_repos}
          public_repo={publicRepo}
        />
      </div>
    </div>
  );
};

export default MemberDetail;
