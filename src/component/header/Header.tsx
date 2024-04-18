// MODULE
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// API
import { memberSearchGET } from "../../api/github";
// ZUSTAND
import { searchStore } from "../../store/searchStore";
// IMAGE
import Logo from "/logo.png";
// TYPE
interface Props {}
const Header: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { keyword, setKeyword, setSearchResult } = searchStore();
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  const handleSearchMember = async () => {
    try {
      const response: any = await memberSearchGET(keyword);
      console.log(response);
      setSearchResult(response.data);
      navigate("result");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header id={`header`}>
      <div className="con">
        <ul className="flex flex_jc_sb flex_ai_c">
          <li className="logo_section">
            <img src={Logo} alt="" loading="lazy" width={50} height={50} />
          </li>
          <li className="member_info"></li>
          <li className="search_input">
            <label htmlFor="keyword"></label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={keyword}
              onChange={onChangeKeyword}
            />
            <button onClick={() => handleSearchMember()}>검색</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
