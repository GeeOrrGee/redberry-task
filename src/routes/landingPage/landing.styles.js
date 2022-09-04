import styled from 'styled-components';

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 2vw, 4rem);
    max-width: 35rem;
    width: 85vw;
    margin-bottom: 2rem;
    a {
        text-decoration: none;
        color: inherit;
        button {
            text-transform: uppercase;
        }
    }
`;

export const LandingPageContainer = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;

    flex-direction: column;
    align-items: center;
    background-color: white;
    justify-content: space-between;
    padding-block: clamp(3rem, 4vw, 10rem);
    img:first-child {
        width: clamp(9rem, 8vw, 16rem);
        padding-top: 3rem;
    }
    img {
        width: 75%;
        max-width: 78rem;
    }
`;
