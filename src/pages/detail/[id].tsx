// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
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
import Meta from "../../component/meta/Meta";
import MoveTop from "../../component/common/moveTop/MoveTop";
import Skeleton from "../../component/common/skeleton";
// STYLED
import { Style } from "./style";
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

const RepositoryList: React.FC<Props> = ({
  public_repo_count,
  public_repo,
  loginId,
  listRef,
}) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");

  // const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setKeyword(e.target.value);
  // };
  // const handleClearKeyword = () => {
  //   setKeyword("");
  // };

  const handleCopyGeiCloneURL = (url: string, repoName: string) => {
    window.navigator.clipboard.writeText(url).then(() => {
      alert(`${repoName} 리포지토리 주소가 복사되었습니다!`);
    });
  };

  return (
    <>
      <Meta id={loginId} title="" image="" description="" />
      <Style.RepoBox>
        <div className="flex flex_jc_sb flex_ai_c">
          <h5>
            총
            {keyword === "" ? (
              <span>{public_repo_count}개의 저장소를 볼 수 있어요</span>
            ) : (
              <span>
                {
                  public_repo.filter((repo: Repo) =>
                    repo.name.includes(keyword)
                  ).length
                }
                개의 저장소가 확인되요
              </span>
            )}
          </h5>
          {/* <Style.KeywordBox>
            <input
              type="text"
              id="filter_repo"
              value={keyword}
              onChange={onChangeKeyword}
              placeholder="찾을 저장소 키워드를 입력해주세요"
            />
            {keyword !== "" && (
              <button onClick={() => handleClearKeyword()}>X</button>
            )}
          </Style.KeywordBox> */}
        </div>
        <ul>
          {public_repo !== null ? (
            Array.isArray(public_repo) &&
            (keyword === ""
              ? public_repo
              : public_repo.filter((repo: Repo) => repo.name.includes(keyword))
            ).map((repo: Repo, index: number) => (
              <li key={repo.id} className="flex flex_ai_c flex_jc_sb">
                {index} :
                <RepositoryItem
                  repoData={repo}
                  event={() =>
                    navigate(`/${loginId}/${repo.name}`, {
                      state: { loginId: loginId, repoName: repo.name },
                    })
                  }
                />
                <Style.CloneButton
                  onClick={() =>
                    handleCopyGeiCloneURL(repo.clone_url, repo?.name)
                  }
                >
                  Clone
                </Style.CloneButton>
              </li>
            ))
          ) : (
            <Skeleton />
          )}
          {public_repo !== null && public_repo?.length > 29 && (
            <li ref={listRef} className="observe_item"></li>
          )}
        </ul>
      </Style.RepoBox>
    </>
  );
};

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const { headerFixed, setHeaderFixed, detailView, setDetailView } =
    commonStore();

  const [userData, setUserData] = useState<Repo | any>(null);
  const [profileRepo, setProfileRepo] = useState<string | any>("");
  const [tabActive, setTabActive] = useState<string>("repo");
  const [ref, inView] = useInView();
  const [listRef, listInView] = useInView();

  const StorageData: any = localStorage.getItem("userData");

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
        const responseReadme: any | Repo = await memberRepoReadMeGET(
          state.id,
          state.id
        );
        setProfileRepo(responseReadme?.data.content);
        localStorage.setItem("userReadMe", responseReadme?.data.content);
        await addResultMemberDataToIndexedDB(
          response?.data,
          responseReadme?.data.content,
          setTime,
          state.id
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setUserData(getIndexedDB[0].memberResult);
      localStorage.setItem(
        "userData",
        JSON.stringify(getIndexedDB[0].memberResult)
      );
      setProfileRepo(getIndexedDB[0].readmeData);
      localStorage.setItem("userReadMe", getIndexedDB[0].readmeData);
    }
  };

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["open-repository", userData?.repos_url],
      queryFn: ({ pageParam }) =>
        memberRepositoryListGET(userData?.repos_url, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any | object[], allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    if (userData !== null && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, data]);
  useEffect(() => {
    if (inView) {
      setHeaderFixed(false);
    } else {
      setHeaderFixed(true);
    }
  }, [inView]);

  useLayoutEffect(() => {
    setDetailView("userInfo");
    getResultMemberDataToIndexedDB(state.id);
    if (StorageData === null) {
      getMemberInfo();
    } else {
      setUserData(JSON.parse(StorageData));
      setProfileRepo(localStorage.getItem("userReadMe"));
    }
  }, []);

  return (
    <>
      {headerFixed && <MoveTop />}
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
        <Style.TabButton>
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
              <button
                onClick={() => handleTabMenuButton("chart")}
                value="chart"
              >
                Chart
              </button>
            </li>
          </ul>
        </Style.TabButton>
        <div>
          {tabActive === "repo" ? (
            <>
              <ScrollRestoration />
              {userData !== null && !isFetching && (
                <RepositoryList
                  public_repo_count={userData?.public_repos}
                  public_repo={data?.pages
                    .map((item: unknown | any) => item.data)
                    .flat()}
                  loginId={JSON.parse(StorageData).login}
                  listRef={listRef}
                />
              )}
            </>
          ) : (
            "준비중"
          )}
        </div>
      </div>
    </>
  );
};

export default MemberDetail;
