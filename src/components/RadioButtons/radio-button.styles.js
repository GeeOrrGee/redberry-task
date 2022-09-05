import styled from 'styled-components';

export const RadioButton = styled.div`
    width: 2rem;
    height: 2rem;
    outline: 2px solid var(--light-blue);
    border-radius: 50rem;
    border: 2px solid #fff;
    background-color: ${({ active }) =>
        active ? 'var(--light-blue)' : '#fff'};
`;

export const RadioOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    &:hover {
        div {
            opacity: 0.5;
            transition: all 0.2s;
            background-color: var(--light-blue);
        }
    }
    span {
        font-size: clamp(1rem, 1vw, 1.6rem);
    }
`;

export const RadioOptionsContainer = styled.div`
    display: flex;
    gap: clamp(3rem, 3vw, 6rem);
    align-items: center;
`;

export const RadioContainer = styled.figure`
    svg {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        transform: translate(55%, -10%);
        @media (max-width: 50em) {
            transform: translate(75%, -25%);
            width: 2rem;
            height: 2rem;
        }
    }
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    width: 100%;
    margin-block: 1.5rem;
`;
