import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10ex;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 90%;
  input {
    width: 100%;
    padding: 0 1.4rem;
    height: 4rem;
    border-radius: 0.25rem;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;
    &:placeholder {
      color: var(--text-body);
    }
    & + input {
      margin-top: 1rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
`
