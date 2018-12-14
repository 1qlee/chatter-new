import styled from "styled-components";
import styles from "./styles";

const Content = styled.div`
  h1,h2,h3,p {
    & + p {
      margin-top: 1rem;
    }
  }
  &.has-text-centered {
    text-align: center;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export default Content;
