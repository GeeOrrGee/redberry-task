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
        &::-webkit-scrollbar {
            width: 8px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: rgb(0, 0, 0, 0.2);
            transition: 0.1s all ease-in;
            border-radius: 30px;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: rgb(0, 0, 0, 0.3);
        }
    }

    html {
        font-family: 'helvetica-neue', sans-serif;
        font-size: 10px;
        /* text-transform: uppercase; */
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
