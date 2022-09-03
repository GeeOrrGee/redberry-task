import styled from 'styled-components';

export const LaptopPageContainer = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-block: 5rem;
    h1 {
        /* margin-block: 2rem; */
        font-size: clamp(1.4rem, 1.6vw, 3rem);
    }

    @media (max-width: 40em) {
        padding-block: 4.5rem 0;
    }
`;
