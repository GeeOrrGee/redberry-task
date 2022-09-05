import styled from 'styled-components';
export const LaptopExtraDetails = styled.ul`
    list-style: none;
    display: flex;
    width: 100%;
    li {
        flex: 1 1 50%;
    }
`;
export const InfoListItem = styled.li`
    font-weight: 700;
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
    /* text-align: center; */
    font-size: clamp(1.2rem, 1.3vw, 1.6rem);

    span {
        color: #2e2e2e;
        font-weight: 700;
        width: 50%;

        svg {
            align-self: center;
            margin-top: 0.2rem;
            margin-left: 0.5rem;
            padding-top: 0.1rem;
            width: 1.5rem;
            height: 1.5rem;
            @media (max-width: 50em) {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        &:last-child {
            color: grey;
        }
    }
`;

export const InfoListContainer = styled.ul`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    padding-inline: 3rem;
    gap: 2rem;
    @media (max-width: 50em) {
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        grid-template-rows: unset;
        padding: unset;
        gap: 1.2rem;

        /* padding-top: 2rem; */
    }
`;

export const TwoSidesContainer = styled.div`
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    ul {
        grid-template-columns: 1fr;
        width: 50%;
        padding: 5rem;
        grid-auto-flow: row;
    }
    img {
        width: 50%;
        /* height: 100%; */
        object-fit: cover;
    }
    @media (max-width: 50em) {
        flex-direction: column;
        ul,
        img {
            width: 100%;
            padding: unset;
            padding-top: 3rem;
        }
    }
`;

export const LaptopDetailsContainer = styled.figure`
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 120rem;
    /* height: 100%; */
    margin-bottom: 2rem;
    ul:last-child {
        grid-template-rows: repeat(2, 1fr);
    }
`;
