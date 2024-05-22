// MODULE
import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Buffer } from "buffer";
// TYPE
interface Props {
  readme: string;
  radius: string;
}
// STYLED
const ReadMeBox = styled.div`
  > *,
  > * * {
    font-size: revert;
    // white-space: pre-wrap;
  }
  overflow-x: auto;
  padding: 1rem;
  border-radius: ${(props) =>
    props.borderRadius === undefined ? "0.5rem" : props.borderRadius};
  border: 1px solid var(--light-gray);
  h2 {
    padding-bottom: 0.3em;
    margin-top: 24px;
    font-size: 1.5em;
    line-height: 1.25;
  }
  h3 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-size: 1.25em;
    line-height: 1.25;
  }
  a {
    color: var(--blue);
    font-weight: 600;
    text-decoration: underline;
  }
  code {
    padding: 0.3rem;
    background: var(--light-gray);
    border-radius: 5px;
    font-size: inherit;
    color: var(--white);
  }
  table {
    table-layout: fixed;
    border-collapse: collapse;

    thead {
      th {
        padding: 0.5rem;
        background: var(--light-gray);
        border: 1px solid var(--gray);
      }
    }
    tbody {
      td {
        padding: 0.5rem;
        border: 1px solid var(--gray);
      }
    }
  }
`;
const README: React.FC<Props> = ({ readme, radius }) => {
  const buffer = Buffer.from(readme, "base64").toString("utf8");
  const plugins = [rehypeRaw, remarkGfm];

  return (
    <ReadMeBox borderRadius={radius}>
      <Markdown rehypePlugins={plugins}>{buffer}</Markdown>
    </ReadMeBox>
  );
};

export default README;
