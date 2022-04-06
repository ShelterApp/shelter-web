import { css } from 'styled-components';

const respondTo = (size: string) => {
  return (...style: [TemplateStringsArray]) => {
    return css`
      @media (min-width: ${props => props.theme.breakpoints[size]}) {
        ${css(...style)};
      }
    `;
  };
};

export default respondTo;
