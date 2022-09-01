import styled from 'styled-components';

const saturatedBlue = '#6499FF';

export const RouteButtonsContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    margin-top: 3rem;
    div {
        max-width: 22rem;
        margin-left: auto;
        button {
            font-size: clamp(1.2rem, 1vw, 2rem);
        }
    }
`;
