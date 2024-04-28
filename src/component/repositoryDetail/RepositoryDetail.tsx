// MODULE
import { useState } from "react";
import styled from "styled-components";
import README from "../README";
import { memberProfileRepoGET } from "../../api/github";
// TYPE
interface Props {
  apiData: unknown;
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
const RepositoryDetail: React.FC<Props> = ({ apiData }) => {
  const [tabActive, setTabActive] = useState<string>("readme");
  const handleTabmenuButton = (value: string) => {
    setTabActive(value);
  };
  console.log("data", apiData);
  let readmeElement;
  for (let i = 0; i < apiData.length; i++) {
    if (apiData[i].name === "README.md") {
      readmeElement = apiData[i];
      break;
    }
  }

  if (readmeElement) {
    console.log("Found element:", readmeElement);
  } else {
    console.log("README.md not found in the array");
  }
  return (
    <div className="con">
      <TabButton>
        <ul className="flex flex_ai_c">
          <li
            id="readme"
            className={`${
              tabActive === "readme" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("readme")}
              value="readme"
            >
              README.md
            </button>
          </li>
          <li
            id="repo"
            className={`${
              tabActive === "repo" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button onClick={() => handleTabmenuButton("repo")} value="repo">
              Repository
            </button>
          </li>
          <li
            id="chart"
            className={`${
              tabActive === "chart" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button onClick={() => handleTabmenuButton("chart")} value="chart">
              Chart
            </button>
          </li>
          <li
            id="commit"
            className={`${
              tabActive === "commit" && "active"
            } flex flex_jc_c flex_ai_c cursor_p`}
          >
            <button
              onClick={() => handleTabmenuButton("commit")}
              value="commit"
            >
              Commit
            </button>
          </li>
        </ul>
      </TabButton>
      {/* <README readme={readmeElement} /> */}
    </div>
  );
};

export default RepositoryDetail;
