// MODULE
import styled from "styled-components";
// STYLED
const MeneulBox = styled.div`
  padding: 4rem 2rem;
  margin-top: 12rem;
  background: #f3f1b6;
  h1 {
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
  }
`;
const Home = () => {
  return (
    <div className="con">
      <MeneulBox>
        <h1>Who`s git 사용법</h1>
      </MeneulBox>
    </div>
  );
};

export default Home;
