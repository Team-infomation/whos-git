// MODULE
import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import rehypeRaw from "rehype-raw";
import { Buffer } from "buffer";
// TYPE
interface Props {
  readme: string;
}
// STYLED
const ReadMeBox = styled.div`
  > * {
    font-size: unset;
  }
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  h2 {
    padding-bottom: 0.3em;
    margin-top: 24px;
    font-size: 1.5em;
    line-height: 1.25;
  }
  h3 {
    margin-bottom: 16px;
    font-size: 1.25em;
    line-height: 1.25;
  }
  a {
    text-decoration: underline;
  }
`;
const README: React.FC<Props> = ({ readme }) => {
  const buffer = Buffer.from(readme, "base64").toString("utf8");
  const plugins = [rehypeRaw];

  return (
    <ReadMeBox>
      <Markdown rehypePlugins={plugins}>{buffer}</Markdown>
    </ReadMeBox>
  );
};

export default README;
