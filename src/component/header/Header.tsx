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
// STYLED
const SearchBar = styled.header`
  box-shadow: 0 0.2rem 1rem 0 rgba(0, 0, 0, 0.2);
  & ul {
    .search_input {
      input {
        width: 75rem;
        height: 4.2rem;
        padding: 0.3rem 0.5rem;
        border: 1px solid var(--light-gray);
        border-right: none;
        font-size: 1.6rem;
      }
    }
  }
`;
const SearchButton = styled.button`
  width: 10rem;
  height: 4.2rem;
  background: #9bc3ff;
  border: 1px solid #9bc3ff;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
`;
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
    <SearchBar id={`header`}>
      <div className="con">
        <ul className="flex flex_jc_sb flex_ai_c">
          <li className={`logo_section`}>
            <img src={Logo} alt="" loading="lazy" width={50} height={50} />
          </li>
          <li className={`member_info`}></li>
          <li className={`search_input flex flex_ai_c`}>
            <label htmlFor="keyword"></label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={keyword}
              onChange={onChangeKeyword}
            />
            <SearchButton onClick={() => handleSearchMember()}>
              검색
            </SearchButton>
          </li>
        </ul>
      </div>
    </SearchBar>
  );
};

export default Header;
