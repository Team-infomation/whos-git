// MODULE
import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import rehypeRaw from "rehype-raw";
import remarkEmoji from "remark-emoji";
// TYPE
interface Props {
  readme: string;
}
// STYLED
const ReadMeBox = styled.div`
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
  const markdownChange = () => {
    try {
      const decodedString = atob(readme);
      return decodedString;
    } catch (error) {
      console.error("Error decoding base64:", error);
    }
  };
  const plugins = [rehypeRaw, remarkEmoji];
  return (
    <ReadMeBox>
      <Markdown rehypePlugins={plugins}>{markdownChange()}</Markdown>
    </ReadMeBox>
  );
};

export default README;
