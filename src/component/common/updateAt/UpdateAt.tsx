// MODULE
import styled from "styled-components";
// TYPE
interface Props {
  updatedAt: string;
  textType: string;
}
// STYLED
const UpdatedAtBox = styled.div``;
const UpdateAt: React.FC<Props> = ({ updatedAt, textType }) => {
  return (
    <UpdatedAtBox>
      {textType === "commit" ? "마지막 커밋" : "업데이트"} : {updatedAt}
    </UpdatedAtBox>
  );
};

export default UpdateAt;
