import styled from 'styled-components';

export const LaptopTextContainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    font-size: clamp(1.2rem, 0.8vw, 2rem);
    padding: 1rem;
    div {
        color: #2e2e2e;
        span:first-child {
            font-weight: 600;
        }
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    a {
        color: #4386a9;
    }
`;

export const LaptopContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 55rem;
    height: 16vh;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 10px;
    gap: 1rem;
    border: 1px solid rgb(174, 209, 234);
    background-color: rgb(174, 209, 234, 0.2);
    max-height: 23rem;
    div:first-child {
        width: 90%;
        height: 100%;
        img {
            width: 100%;
            object-fit: cover;
            height: 100%;
            border-radius: 10px;
        }
    }

    @media (max-width: 50em) {
        width: 90vw;
        max-width: 40rem;
        max-height: 12rem;
    }
`;

export const NoLaptopsContainer = styled.figure`
    width: 80vw;
    max-width: 37rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    p {
        font-size: clamp(1.4rem, 1.4vw, 2.2rem);
    }
    button {
        transition: 0.2s all;
    }
`;

export const LaptopsListContainer = styled.figure`
    width: 100vw;
    height: 73vh;
    overflow-y: scroll;

    max-width: 110rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-inline: 1rem;
    gap: 4rem;
    place-items: center;
    place-content: flex-start;
    margin-top: 3rem;
    @media (max-width: 40em) {
        grid-template-columns: 1fr;
        height: 100vh;
        gap: 2rem;
    }
`;
