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
