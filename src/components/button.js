import styled from "styled-components";

const Button = styled.button`
  background-color: ${props => props.background};
  border-radius: 5px;
  border: none;
  color: ${props => props.color};
  cursor: pointer;
  font-weight: 700;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  &.is-fullwidth {
    width: 100%;
`

const ButtonLink = styled.a`
  background-color: ${props => props.background};
  border-radius: 5px;
  border: none;
  color: ${props => props.color};
  cursor: pointer;
  display: block;
  font-weight: 700;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  &.is-fullwidth {
    width: 100%;
`

export {Button, ButtonLink};
