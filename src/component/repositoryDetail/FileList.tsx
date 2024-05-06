// MODULE
import styled from "styled-components";
// API
import { exloerRepositoryListGET } from "../../api/github";
import { useLayoutEffect, useState } from "react";
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
  const getDirectoryFileList = async (name: string) => {
    // console.log(name);
    try {
      const response = await exloerRepositoryListGET(id, repoName, name);
      console.log(response);
      setFileResult(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("listData", listData);
  useLayoutEffect(() => {
    setFileResult(listData);
  }, []);
  return (
    <ListBoxFrame>
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
