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
  useLayoutEffect(() => {
    if (localStorage.getItem("userData") === null) {
      getMemberInfo();
    } else {
      const StorageData = localStorage.getItem("userData");
      setUserData(JSON.parse(StorageData));
    }
  }, []);
  console.log(userData);
  return (
    <div className="con">
      <UserDetail avatar={userData.avatar_url} loginId={userData.login} />
    </div>
  );
};

export default MemberDetail;
