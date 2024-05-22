// MODULE
import styled from "styled-components";
export const Style = {
  TabButton: styled.div`
    margin-top: 9.5rem;
    li {
      flex-basis: 13.5rem;
      height: 3.5rem;
      background: var(--gray);
      border: 1px solid var(--light-gray);
      border-bottom: none;
      font-size: 2rem;
      color: var(--white);
      &:first-child {
        border-top-left-radius: 0.5rem;
      }
      &:last-child {
        margin-left: -1px;
        border-top-right-radius: 0.5rem;
      }
      &.active {
        background: var(--white);
        color: var(--dark-gray);
      }
    }
  `,
  RepoBox: styled.div`
    padding: 2rem;
    border: 1px solid var(--light-gray);
    h5 {
      font-size: 1.6rem;
      font-weight: 600;
      span {
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
    ul {
      margin-top: 2rem;
      li {
        cursor: crosshair;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--light-gray);
        &.observe_item {
          height: 0;
          border: none;
          overflow: hidden;
        }
        > div {
          flex-grow: 1;
          h2 {
            flex-grow: 1;
            font-size: 2rem;
            font-weight: 700;
          }
        }
      }
    }
  `,
  CloneButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 8rem;
    height: 2.5rem;
    margin-left: 2rem;
    background: #314d76;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);
  `,
  KeywordBox: styled.div`
    position: relative;
    flex-basis: 40rem;
    input {
      width: 100%;
      padding: 0.5rem 3rem 0.5rem 1rem;
      border: 1px solid var(--gray);
      font-size: 1.6rem;
      &::placeholder {
        font-size: 1.4rem;
        font-weight: 800;
        color: var(--light-gray);
      }
    }
    button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 2rem;
      height: 2rem;
      top: calc(50% - 1rem);
      right: 0.5rem;
      background: var(--gray);
      border-radius: 5px;
      border: 1px solid var(--gray);
      font-size: 1.6rem;
      color: var(--white);
      cursor: pointer;
    }
  `,
};
