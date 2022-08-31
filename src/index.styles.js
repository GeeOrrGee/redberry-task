import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
    @font-face {
        font-family: 'helvetica-neue';
        src: url(font/HelveticaNeue.ttc);
        font-style: normal;
        font-weight: 100;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'helvetica-neue', sans-serif;
        font-size: 10px;
    }

    :root {
        --light-blue: #62a1eb;
        --moderate-blue: #317ad0;
        --dark-blue: #1a5dab;
        --greysh-background: #f7f7f7;
        --grey-background: #ebebeb;
        --light-blue-outline: #8ac0e2;
        --grey-font-color: #2e2e2e;
        --error-red: #e52f2f;
    }
`;

export default GlobalStyle;
