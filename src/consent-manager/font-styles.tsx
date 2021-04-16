import { css } from 'styled-components';

export default css`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  color: #435a6f;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.05px;

  @media (max-width: 650px) {
    font-size: 18px;
  }
`;
