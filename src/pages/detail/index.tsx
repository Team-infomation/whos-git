// MODULE
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// API
import { memberInfoGET } from "../../api/github";
import UserDetail from "../../component/userDetail";
// TYPE
interface Props {}
// STYLED

const MemberDetail: React.FC<Props> = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const StorageData: unknown | any = localStorage.getItem("userData");
  const getMemberInfo = async () => {
    try {
      const response: unknown | any = await memberInfoGET(state.id);
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      console.log("로딩완료");
    }
  };
  console.log("StorageData", StorageData);
  console.log("state", state);
  useLayoutEffect(() => {
    if (StorageData === null) {
      getMemberInfo();
    } else {
      setUserData(JSON.parse(StorageData));
    }
  }, []);
  console.log(userData);
  return (
    <div className="con">
      <UserDetail avatar={userData?.avatar_url} loginId={userData?.login} />
      <div>
        <ul className="flex flex_ai_c">
          <li className="flex flex_jc_c flex_ai_c cursor_p">Repository</li>
          <li className="flex flex_jc_c flex_ai_c cursor_p">Chart</li>
        </ul>
      </div>
    </div>
  );
};

export default MemberDetail;
