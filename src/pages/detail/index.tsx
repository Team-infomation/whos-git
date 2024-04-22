// MODULE
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
// API
import { memberInfoGET, memberProfileRepoGET } from "../../api/github";
// COMPONENT
import UserDetailInfo from "../../component/userDetailInfo";
import RepositoryItem from "../../component/repositoryItem";
// TYPE
interface Props {}
// STYLED
const TabButton = styled.div`
  margin-top: 9.5rem;
  li {
    flex-basis: 13.5rem;
    height: 3.5rem;
    background: var(--gray);
    border: 1px solid var(--light-gray);
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
const RepositoryList = () => {
  return <RepositoryItem />;
};

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [profileRepo, setProfileRepo] = useState<any | string>(null);
  const [tabActive, setTabActive] = useState<string>("repo");
  const StorageData: unknown | any = localStorage.getItem("userData");
  const getMemberInfo = async () => {
    try {
      const response: unknown | any = await memberInfoGET(state.id);
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
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

  useLayoutEffect(() => {
    if (StorageData === null) {
      getMemberInfo();
    } else {
      setUserData(JSON.parse(StorageData));
    }
    getMemberProfileREADME();
  }, []);

  return (
    <div className="con">
      <UserDetailInfo
        avatar={userData?.avatar_url}
        loginId={userData?.login}
        profileRepo={profileRepo}
        bio={userData?.bio}
      />
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
        <RepositoryList />
      </div>
    </div>
  );
};

export default MemberDetail;
