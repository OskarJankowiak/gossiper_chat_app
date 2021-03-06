import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from 'assets/svgs/Logo.svg';

export interface StyledProps {
  readonly $onNavBar: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandTitle = styled.strong<StyledProps>`
  margin-left: 1rem;
  font-size: ${({ theme }) => theme.font.size.large};
  color: ${({ theme, $onNavBar }) => $onNavBar && theme.colors.white};
  transition: all 0.2s ease-in-out;

  ${({ theme }) => theme.mediaQuery.desktop} {
    &:hover {
      color: ${({ theme }) => theme.colors.goldenYellow};
    }
  }
`;

export const LogoSVG = styled(Logo)<StyledProps>`
  ${({ $onNavBar }) =>
    $onNavBar &&
    css`
      width: 5rem;
      height: 5rem;
    `}
`;
