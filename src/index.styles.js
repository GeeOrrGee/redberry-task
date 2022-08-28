import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', sans-serif;
    }

    html {
        font-size: 10px;
    }

    :root {
        --light-blue: #62a1eb;
        --moderate-blue: #317ad0;
        --dark-blue: #1a5dab;
        --grey-background: #f7f7f7;
        --light-blue-outline: #8ac0e2;
    }
`;

export default GlobalStyle;
