import styled from 'styled-components';
import styles from "./styles";

const Main = styled.main`
  background: ${styles.background.normal};
  color: ${styles.white};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`

const MainContainer = styled.div`
  background-color: ${styles.background.light};
  box-shadow: 0 4px 20px ${styles.shadow};
  display: flex;
  height: calc(100% - 240px);
  padding: 1rem;
  width: 1200px;
`

const MainContent = styled.div`
  padding: 5rem 1rem;
  &:first-child {
    width: 70%;
  }
  &:nth-child(2) {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
`

export {Main, MainContainer, MainContent}
