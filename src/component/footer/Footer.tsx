// MODULE
import styled from "styled-components";
// STYLE
const FooterSection = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--gray);
`;
const Footer: React.FC = () => {
  return (
    <FooterSection className="flex flex_jc_c flex_ai_c">
      <div>COPYRIGHT ⓒ 2024. Team-infomation. all right reserved.</div>
    </FooterSection>
  );
};

export default Footer;
