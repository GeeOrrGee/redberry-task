import styled from 'styled-components';

export const RouteButton = styled.button`
    padding-block: 1.5rem;
    background-color: var(--light-blue);
    text-align: center;
    border: none;
    color: white;
    width: 100%;
    border-radius: 6px;
    font-size: clamp(1.2rem, 1.5vw, 2rem);
    cursor: pointer;
    &:hover {
        background-color: var(--moderate-blue);
    }
    &:active {
        background-color: var(--dark-blue);
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 2vw, 4rem);
    max-width: 35rem;
    width: 85vw;
    margin-bottom: 2rem;
`;

// export const ImageContainer = styled.div`
//     display: flex;
//     align-items: center;
//     width: 80%;
//     justify-content: space-between;
//     flex-direction: column;
//     gap: clamp(4rem, 4.5vw, 10rem);
//     img:first-child {
//         width: 16%;
//     }
//     img {
//         width: 100%;
//         object-fit: contain;
//     }
// `;

export const LandingPageContainer = styled.section`
    max-width: 90rem;
    width: 100%;
    height: 100%;
    display: flex;
    /* gap: clamp(5rem, 4.5vw, 10rem); */
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-block: clamp(3rem, 4vw, 6rem);
    img:first-child {
        width: clamp(8rem, 8vw, 16rem);
    }
    img {
        width: 85%;
        max-width: 78rem;
    }
    /* gap: clamp(6rem, 6vw, 12rem); */
`;
