// MODULE
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// API
import { memberSearchGET } from "../../api/github";
// ZUSTAND
import { searchStore } from "../../store/searchStore";
import { commonStore } from "../../store/commonStore";
// IMAGE
import Logo from "/logo.png";
// TYPE
interface Props {}
// STYLED
const SearchBar = styled.header`
  box-shadow: 0 0.2rem 1rem 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 8rem;
  top: 0;
  left: 0;
  background: var(--white);
  .con {
    height: inherit;
    margin-top: 0;
  }
  ul {
    height: inherit;
    li {
      transition: all 0.3s;
      &.search_input {
        flex-basis: 75rem;
        input {
          width: 100%;
          height: 4.2rem;
          padding: 0.3rem 0.5rem;
          border: 1px solid var(--light-gray);
          border-right: none;
          font-size: 1.6rem;
        }
      }
      .member_info {
        flex-grow: 0;
        width: 0;
        overflow: hidden;
      }
    }
  }
  &.active {
    ul {
      .member_info {
        flex-grow: 1;
        width: auto;
      }
      .search_input {
        flex-basis: 30%;
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
const AvatarBox = styled.div`
  flex-basis: 8rem;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  overflow: hidden;
`;
const Header: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { keyword, setKeyword, setSearchResult } = searchStore();
  const { headerFixed } = commonStore();
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  const handleSearchMember = async () => {
    try {
      const response: unknown | any = await memberSearchGET(keyword);
      console.log(response);
      setSearchResult(response.data);
      navigate("result", { state: { searchKeyword: keyword } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SearchBar id={`header`} className={`${headerFixed ? "active" : ""} fixed`}>
      <div className="con">
        <ul className="flex flex_jc_sb flex_ai_c">
          <li className={`logo_section`} onClick={() => navigate("/")}>
            <img src={Logo} alt="" loading="lazy" width={50} height={50} />
          </li>
          <li className={`member_info flex flex_jc_c flex_ai_c`}>
            <img src={Logo} alt="" loading="lazy" width={50} height={50} />
            <p>
              <span>사용자</span>님의 github 정보 보는중
            </p>
          </li>
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
