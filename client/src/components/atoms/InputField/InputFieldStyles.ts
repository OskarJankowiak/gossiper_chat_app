import styled, { css, keyframes } from 'styled-components';

interface Error {
  readonly isError?: boolean;
}

const show = keyframes`
  0%{
    opacity: 0;
    transform: translate(0, -2rem)
  }

  100% {
    opacity: 1;
    transform: translate(0,0)
  }
`;

export const StyledInputElement = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label``;

export const StyledInput = styled.input<Error>`
  margin-top: 1rem;
  min-width: 24rem;
  height: 4rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 0.12rem solid ${({ theme }) => theme.colors.black};
  border-radius: 0.5rem;
  transition: 0.3s ease-in;
  ${({ isError }) =>
    isError &&
    css`
      border: 0.17rem solid ${({ theme }) => theme.colors.red};
    `};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red};
  animation: 0.3s ${show} ease-in;
`;
