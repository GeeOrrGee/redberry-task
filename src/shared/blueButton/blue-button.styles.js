import styled from 'styled-components';

export const BlueButton = styled.button`
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
`;
