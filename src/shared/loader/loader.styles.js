import styled from 'styled-components';

export const Loader = styled.div`
    width: 3rem;
    height: 3rem;
    border: 0.7rem solid grey;
    border-top: 0.7rem solid var(--light-blue);
    animation: 0.7s infinite ease-in loading;
    border-radius: 50rem;
    align-self: center;
    justify-self: center;
    margin: 5rem;

    @keyframes loading {
        70% {
            transform: rotate(320deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const LoaderContainer = styled.div`
    position: fixed;
    /* top: 50%;
    left: 50%; */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.8);
    z-index: 2;
`;
