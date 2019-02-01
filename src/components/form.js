import styled from "styled-components";
import styles from "./styles";

const Form = styled.form`
  background-color: ${styles.background.light};
  box-shadow: 0 10px 30px ${styles.background.light};
  display: block;
  padding: 2rem;
  width: 100%;
  h1 {
    color: ${styles.white.normal};
    text-align: center;
  }
  label {
    color: ${styles.white.light};
    margin-bottom: 0.5rem;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
  }
`

const FormGroup = styled.fieldset`
  display: block;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const Input = styled.input`
  background-color: ${styles.background.normal};
  border-radius: 5px;
  border: 1px solid ${styles.background.border};
  color: ${styles.white.normal};
  font-size: 1rem;
  padding: 1rem 0.5rem;
  width: 100%;
  &:focus {
    border-color: ${styles.grey.light};
    outline: none;
  }
`

export {Form, FormGroup, Input, Label};
