// MODULE
import { useState } from "react";
// ZUSTAND
import { commonStore } from "../../store/commonStore";
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
import FileList from "./FileList";
// TYPE
interface Props {
  apiData: object | any;
  repoName: string;
}
const RepositoryDetail: React.FC<Props> = ({ apiData, repoName }) => {
  const { tabActive } = commonStore();
  const [readMe, setReadMe] = useState<string>("");

  const StorageData: any | object = localStorage.getItem("userData");

  // API
  const getReadMe = async () => {
    await getRepositoryReadmeDataToIndexedDB(
      JSON.parse(StorageData).login,
      repoName
    )
      .then((response: any | object) => {
        if (response.length === 0) {
          memberRepoReadMeGET(JSON.parse(StorageData).login, repoName)
            .then((response: any | object) => {
              setReadMe(response.data.content);
              addRepositoryReadmeDataToIndexedDB(
                response.data.content,
                repoName,
                JSON.parse(StorageData).login
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setReadMe(response[0]?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <>
      {tabActive === "readme" && readMe !== "" && (
        <README readme={readMe} radius={0} />
      )}
      {tabActive === "repo" && (
        <FileList
          listData={apiData}
          id={JSON.parse(StorageData).login}
          repoName={repoName}
        />
      )}
      {tabActive === "commit" && (
        <>
          <div>최근 100개 커밋</div>
          <button onClick={() => getCommitData()}>커밋 가져오기</button>
        </>
      )}
    </>
  );
};

export default RepositoryDetail;
