import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  z-index: 2;
  width: 57%;
  border: 1px solid var(--lightGrey);

  display: grid;
  grid-column-start: 3;
  grid-column-end: 6;
  text-align: center;
  justify-content: right;
  align-content: right;
  border-radius: 10px;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGrey);
  background: ${(props) => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : "white")};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;

  text-align: center;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;

  input {
    width: 30%;
    padding: 10px;
    border: 1px solid var(--offWhite);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
