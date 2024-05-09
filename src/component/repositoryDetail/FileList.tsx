// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
// API
import { explorerRepositoryListGET } from "../../api/github";
import { addRepositoryFileListDataToIndexedDB } from "../../api/IDBcache";
import FetchRepositoryData from "./FetchRepositoryList";
// STYLED
const ListBoxFrame = styled.div`
  border: 1px solid var(--light-gray);
  ul {
    li {
      padding: 0.5rem;
      font-weight: 500;
      transition: all 0.3s;
      &:not(:last-child) {
        border-bottom: 1px solid var(--light-gray);
      }
      &:hover {
        font-weight: 600;
      }
      i {
        margin-right: 1rem;
        font-size: 1.8rem;
      }
    }
  }
`;
// TYPE
type FileListProps = {
  listData: any | object;
  id: string;
  repoName: string;
};
type ItemMap = {
  name: string;
  type: string;
};

const FileList: React.FC<FileListProps> = ({ listData, id, repoName }) => {
  const [fileResult, setFileResult] = useState<object>([]);
  const [requestUrl, setRequestUrl] = useState<string>("");
  const getDirectoryFileList = async (requestUrl: string, name: string) => {
    try {
      const directoryName = requestUrl === "" ? name : `${requestUrl}/${name}`;
      const response: any | object = await explorerRepositoryListGET(
        id,
        repoName,
        directoryName
      );
      console.log("결과", response);
      const prevData = {
        id: id,
        repoName: repoName,
        name: name,
      };
      localStorage.setItem("prevList", JSON.stringify(directoryName));
      setRequestUrl(directoryName);
      setFileResult(response.data);
      // addRepositoryFileListDataToIndexedDB(id, repoName, response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    setFileResult(listData);
  }, []);
  useEffect(() => {
    console.log(fileResult);
  }, [fileResult]);

  // const fetchGroups = (): Promise<Group[]> =>
  //   axios
  //     .get("https://api.github.com/repos/kkt9102/isotope/contents/bin")
  //     .then((response) => response.data);

  // const { data } = useQuery({ queryKey: ["groups"], queryFn: fetchGroups });
  return (
    <ListBoxFrame>
      <div
        className="request_name"
        onClick={() =>
          requestUrl === "" ? null : getDirectoryFileList(requestUrl)
        }
      >
        {requestUrl === "" ? repoName : requestUrl}
      </div>
      <ul>
        {fileResult.length > 0 &&
          fileResult.map((item: ItemMap) => (
            <li
              onClick={() => getDirectoryFileList(requestUrl, item.name)}
              className="flex flex_jc_s flex_ai_c cursor_p"
              key={item.name}
            >
              <div className="file_icon">
                {item.type === "dir" ? (
                  <i className="xi-folder-o"></i>
                ) : (
                  <i className="xi-file-code-o"></i>
                )}
              </div>
              <p>{item.name}</p>
            </li>
          ))}
      </ul>
    </ListBoxFrame>
  );
};

export default FileList;
