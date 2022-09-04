import styled from 'styled-components';

export const LaptopPageContainer = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-block: 2.5rem 5rem;
    h1 {
        font-size: clamp(1.4rem, 1.6vw, 3rem);
        margin-block: 5rem;
    }

    @media (max-width: 40em) {
        padding-block: 4.5rem;
        h1 {
            margin-block: unset;
            margin-bottom: 1rem;
        }
    }
`;
