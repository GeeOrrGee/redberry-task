import styled from 'styled-components';

export const MainContainer = styled.main`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ grey }) =>
        grey ? 'var(--grey-background)' : '#FFF'};
`;
