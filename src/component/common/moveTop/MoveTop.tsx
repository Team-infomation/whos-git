// MODULE
import styled from "styled-components";
// STYLE
const TopButton = styled.button`
  width: 6rem;
  height: 6rem;
  bottom: 4rem;
  right: 10%;
  background: var(--gray);
  border-radius: 50%;
  border: 1px solid var(--gray);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
`;
const MoveTop = () => {
  return (
    <TopButton
      className="fixed"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      TOP
    </TopButton>
  );
};

export default MoveTop;
