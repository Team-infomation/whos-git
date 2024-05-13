// MODULE
import styled from "styled-components";
// UTIL
import { DateFormChange } from "../../../util/UnitCalculator";
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
      {textType === "commit" ? "마지막 커밋" : "업데이트"} :{" "}
      {DateFormChange(updatedAt)}
    </UpdatedAtBox>
  );
};

export default UpdateAt;
