import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

:root{
  --color-primary: #470E5C;
  --color-primary-transparent:rgba(71, 14, 92, 0.18);
  --color-primary-hover: #350745;
  --color-secondary: #ff611a;
  --color-secondary-transparent:rgba(255, 99, 26, 0.18);
  --color-secondary-hover: #d25116;
  --color-secondary-light: #ffead7;
  --color-primary-dark: #084059;
  --color-dark: #011c25;
   --color-danger: #f3162d;
   --color-danger-hover:rgb(186, 19, 35);
   --color-background: #f8f9fa;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-100: #f8f9fa;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", sans-serif;;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: var(--color-dark);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100dvw;
  }

  #root{
    width: 100dvw;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 0.5rem;
    }
  }
`;

export default GlobalStyles;
