import styled from "styled-components";
import styles from "./styles";

const Form = styled.form`
  display: block;
  width: 100%;
`

const FormGroup = styled.fieldset`
  display: block;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const Input = styled.input`
  background-color: ${styles.background.light};
  border-radius: 5px;
  border: 1px solid ${styles.background.border};
  color: ${styles.white};
  padding: 1rem 0.5rem;
  width: 100%;
  &:focus {
    border-color: ${styles.grey.normal};
    outline: none;
  }
`

const Label = styled.label`
  position: absolute;
  top: 1.4rem;
  left: 1rem;
  color: ${styles.white};
  pointer-events: none;
`

export {Form, FormGroup, Input, Label};
