// MODULE
import styled from "styled-components";
// API
import { memberSearchGET } from "../../api/github";
// ZUSTAND
import { searchStore } from "../../store/searchStore";
// IMAGE
import Logo from "/logo.png";
const Header = () => {
  const { keyword, setKeyword, searchResult, setSearchResult } = searchStore();
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  const handleSearchMember = async () => {
    try {
      const response = await memberSearchGET(keyword);
      console.log(response);
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
