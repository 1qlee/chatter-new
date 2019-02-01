import styled from 'styled-components';
import styles from "./styles";

const Title = styled.h1`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: inline-block;
  font-size: 3rem;
  padding: 0.2rem 0.4rem;
  margin-bottom: 2rem;
  border-radius: 0 12px 12px 12px;
`

const Subtitle = styled.h2`
  color: ${props => props.color};
  font-size: 2rem;
  line-height: 1.5;
`

export { Title, Subtitle }
