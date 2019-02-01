import styled from 'styled-components';
import styles from "./styles";

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 32px), calc(-50% - 32px));
  display: inline-block;
  width: 64px;
  height: 64px;
  & > span {
    position: absolute;
    border: 4px solid ${styles.mint};
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
  @keyframes ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }
`

export default Loader
