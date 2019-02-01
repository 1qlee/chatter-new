import styled from 'styled-components';
import styles from "./styles";

const Main = styled.main`
  background: ${styles.background.normal};
  height: 100vh;
  width: 100%;
`

const MainContent = styled.div`
  width: 50%;
  padding: 0 1rem;
`

export {Main, MainContent}
