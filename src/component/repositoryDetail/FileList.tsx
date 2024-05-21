// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// API
import { explorerRepositoryListGET } from "../../api/github";
// UTIL
import { VolumeCalc } from "../../util/UnitCalculator";
// STYLED
const ListBoxFrame = styled.div`
  border: 1px solid var(--light-gray);
  .request_name {
    padding-left: 0.5rem;
    i {
      margin-right: 1rem;
      font-size: 2.5rem;
    }
    border-bottom: 1px solid var(--light-gray);
    li {
      padding: 0.5rem 0;
      border-bottom: none !important;
      font-size: 2rem;
      &:hover {
        font-weight: inherit;
      }
      button {
        color: var(--blue);
        &:hover {
          font-weight: 600;
        }
      }
    }
  }
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
  size: number;
};

const SortType = [
  {
    value: "type_asc",
    name: "타입별 ⬆️",
    icon: "xi-sort-asc",
  },
  {
    value: "type_desc",
    name: "타입별 ⬇️",
    icon: "xi-sort-desc",
  },
  {
    value: "name_asc",
    name: "파일명 ⬆️",
    icon: "xi-sort-asc",
  },
  {
    value: "name_desc",
    name: "파일명 ⬇️",
    icon: "xi-sort-desc",
  },
  {
    value: "size_asc",
    name: "크기별 ⬆️",
    icon: "xi-sort-asc",
  },
  {
    value: "size_desc",
    name: "크기별 ⬇️",
    icon: "xi-sort-desc",
  },
];

const useGetDirectoryFileList = (
  id: string,
  repoName: string,
  requestUrl: string
) => {
  return useQuery({
    queryKey: ["directory-files", id, repoName, requestUrl],
    queryFn: () => explorerRepositoryListGET(id, repoName, requestUrl),
    staleTime: 1000 * 60 * 60,
  });
};

const FileList: React.FC<FileListProps> = ({ listData, id, repoName }) => {
  const [fileResult, setFileResult] = useState<any[]>([]);
  const [requestUrl, setRequestUrl] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [arrayPathName, setArrayPathName] = useState<any[]>([]);
  const { isLoading, error, data }: any = useGetDirectoryFileList(
    id,
    repoName,
    requestUrl
  );

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortType(e.target.value);
  };

  useLayoutEffect(() => {
    setFileResult(listData);
    setSortType("type_asc");
  }, []);
  useEffect(() => {
    if (!isLoading && error === null) {
      setFileResult(data?.data);
    }
  }, [fileResult, data]);
  fileResult.sort((start, end) =>
    sortType === "type_asc"
      ? start.type.localeCompare(end.type)
      : sortType === "type_desc"
      ? end.type.localeCompare(start.type)
      : sortType === "name_asc"
      ? start.name.localeCompare(end.name)
      : sortType === "name_desc"
      ? end.name.localeCompare(start.name)
      : sortType === "size_asc"
      ? start.size - end.size
      : sortType === "size_desc" && end.size - start.size
  );
  return (
    <ListBoxFrame>
      <div className="request_name flex flex_jc_sb flex_ai_c">
        <div className="flex flex_ai_c">
          <i className="xi-github-alt"></i>
          <ul className="flex flex_ai_c">
            <li>
              {arrayPathName.length >= 1 ? (
                <button onClick={() => setRequestUrl("")}>{repoName}</button>
              ) : (
                repoName
              )}
            </li>
            {requestUrl !== "" &&
              arrayPathName.map((depth: string, index: number) => {
                const setItem = (i: number) => {
                  localStorage.setItem(
                    "prevList",
                    JSON.stringify(arrayPathName.slice(0, i + 1).join("/"))
                  );
                  setRequestUrl(arrayPathName.slice(0, i + 1).join("/"));
                  const maxLength: any | object = arrayPathName.slice(0, i + 1);
                  setArrayPathName(maxLength);
                };
                return (
                  <li key={depth}>
                    &nbsp;/&nbsp;
                    {index + 1 === arrayPathName.length ? (
                      depth
                    ) : (
                      <button onClick={() => setItem(index)}>{depth}</button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex flex_jc_e">
          <select
            name=""
            id=""
            style={{ fontSize: "2rem" }}
            defaultValue={sortType}
            onChange={(e) => onChangeSortType(e)}
          >
            {SortType.map((option: any) => (
              <option
                key={option.value}
                value={option.value}
                style={{ fontSize: "2rem" }}
              >
                {option.name}
                {/* <i className={option.icon}></i> */}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul>
        {fileResult.length > 0 &&
          fileResult.map((item: ItemMap) => {
            const directoryName =
              requestUrl === "" ? item.name : `${requestUrl}/${item.name}`;
            const setItem = () => {
              localStorage.setItem("prevList", JSON.stringify(directoryName));
              setRequestUrl(directoryName);
              const maxLength: any | object = directoryName.split("/");
              setArrayPathName(maxLength);
            };
            return (
              <li
                onClick={() => (item.type === "dir" ? setItem() : null)}
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
                <p style={{ flexGrow: 1, textAlign: "right" }}>
                  {item.type !== "dir" && VolumeCalc(item.size, "Byte")}
                </p>
              </li>
            );
          })}
      </ul>
    </ListBoxFrame>
  );
};

export default FileList;
