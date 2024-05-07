// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
// API
import { exloerRepositoryListGET } from "../../api/github";
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
  listData: object;
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
  const getDirectoryFileList = async (name: string) => {
    try {
      const response: any | object = await exloerRepositoryListGET(
        id,
        repoName,
        name
      );
      console.log("결과", response);
      setRequestUrl(`/${repoName}/${name}`);
      setFileResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("listData", listData);
  useLayoutEffect(() => {
    setFileResult(listData);
  }, []);
  useEffect(() => {}, [fileResult]);
  return (
    <ListBoxFrame>
      <div className="request_name">{requestUrl}</div>
      <ul>
        {fileResult.map((item: ItemMap) => (
          <li
            onClick={() => getDirectoryFileList(item.name)}
            className="flex flex_jc_s flex_ai_c cursor_p"
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
